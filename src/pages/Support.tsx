import { motion } from 'motion/react';
import { MessageSquare, Phone, HelpCircle, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { EditableText } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';
import emailjs from '@emailjs/browser';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocFromServer, doc } from 'firebase/firestore';
import { auth } from '@/src/lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return new Error(JSON.stringify(errInfo));
}

export default function Support() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { content } = useContent();
  const formRef = useRef<HTMLFormElement>(null);

  const [lastInquiry, setLastInquiry] = useState<{
    name: string;
    phone: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('content') as string;
    const targetEmail = '17381-2@nonghyup.com';

    setLastInquiry({ name, phone, message });

    const timeout = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error('전송 시간 초과')), ms));

    try {
      // 1. Save to Firestore (Primary record)
      try {
        await Promise.race([
          addDoc(collection(db, 'inquiries'), {
            name,
            phone,
            content: message,
            createdAt: serverTimestamp()
          }),
          timeout(5000) // 5 second timeout for DB save
        ]);
        console.log('Inquiry saved to Firestore');
      } catch (fsError) {
        console.error('Firestore save failed or timed out:', fsError);
        // We continue to email even if Firestore fails/times out
      }

      // 2. Try sending via EmailJS
      const SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY;

      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        try {
          await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
              from_name: name,
              from_phone: phone,
              message: message,
              to_email: targetEmail
            },
            PUBLIC_KEY
          );
          console.log('Email sent successfully via EmailJS');
        } catch (emailError) {
          console.error('EmailJS failed, will rely on manual mailto:', emailError);
          // We don't throw here because Firestore already succeeded
        }
      } else {
        console.warn("EmailJS not configured. Manual mailto will be required.");
        // Automatically try to open mailto as a convenience
        const subject = encodeURIComponent(`[차린 1:1 문의] ${name}님`);
        const body = encodeURIComponent(`이름: ${name}\n연락처: ${phone}\n\n문의내용:\n${message}`);
        const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
        
        // Try multiple ways to trigger mailto in iframes
        try {
          window.location.href = mailtoUrl;
        } catch (e) {
          window.open(mailtoUrl, '_blank');
        }
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setSubmissionError(`문의 저장 중 오류가 발생했습니다: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualMail = () => {
    if (!lastInquiry) return;
    const targetEmail = '17381-2@nonghyup.com';
    const subject = encodeURIComponent(`[차린 1:1 문의] ${lastInquiry.name}님`);
    const body = encodeURIComponent(`이름: ${lastInquiry.name}\n연락처: ${lastInquiry.phone}\n\n문의내용:\n${lastInquiry.message}`);
    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    
    // Create a temporary link and click it - more reliable in some environments
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('17381-2@nonghyup.com').then(() => {
      alert('이메일 주소가 복사되었습니다: 17381-2@nonghyup.com');
    });
  };

  const handleCopyContent = () => {
    if (!lastInquiry) return;
    const text = `이름: ${lastInquiry.name}\n연락처: ${lastInquiry.phone}\n문의내용: ${lastInquiry.message}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('문의 내용이 복사되었습니다. 메일 앱에 붙여넣어 전송해 주세요.');
    });
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <EditableText 
            contentPath="support.title" 
            as="h1" 
            className="text-3xl md:text-4xl font-heading font-bold mb-4" 
          />
          <EditableText 
            contentPath="support.subtitle" 
            as="p" 
            className="text-base md:text-lg text-gray-600" 
          />
        </motion.div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          <div className="bg-background p-6 md:p-8 rounded-3xl border border-gray-100 flex items-center gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <Phone className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500 mb-1">전화 상담</p>
              <EditableText 
                contentPath="support.phone" 
                as="p" 
                className="text-xl md:text-2xl font-bold" 
              />
            </div>
          </div>
          <div className="bg-background p-6 md:p-8 rounded-3xl border border-gray-100 flex items-center gap-4 md:gap-6 cursor-pointer hover:bg-yellow-50 transition-colors">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 flex-shrink-0">
              <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-500 mb-1">카카오톡 상담</p>
              <p className="text-xl md:text-2xl font-bold">실시간 채팅하기</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2">
            <HelpCircle className="text-primary" size={24} /> 자주 묻는 질문
          </h2>
          <div className="space-y-3 md:space-y-4">
            {content.support.faqs.map((_: any, idx: number) => (
              <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  className="w-full px-5 md:px-6 py-4 md:py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <EditableText 
                    contentPath={`support.faqs.${idx}.q`} 
                    as="span" 
                    className="font-bold text-sm md:text-base" 
                  />
                  <ChevronDown className={`transition-transform flex-shrink-0 ${openIdx === idx ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openIdx === idx && (
                  <div className="px-5 md:px-6 py-4 md:py-5 bg-gray-50 text-gray-600 border-t border-gray-100 text-sm md:text-base leading-relaxed">
                    <EditableText 
                      contentPath={`support.faqs.${idx}.a`} 
                      as="div" 
                      multiline 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-background p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">1:1 문의하기</h2>
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 md:py-8"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">문의 내용이 저장되었습니다</h3>
                <p className="text-sm md:text-base text-gray-600">
                  내용은 데이터베이스에 안전하게 기록되었습니다.<br />
                  <span className="text-primary font-bold">최종 전송을 위해 아래 단계 중 하나를 진행해 주세요.</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto mb-10">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="font-bold mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">1</span>
                    가장 빠른 방법 (메일 앱 실행)
                  </p>
                  <p className="text-sm text-gray-600 mb-4">버튼을 누른 후 실행되는 메일 앱에서 <span className="font-bold text-gray-900">'전송'</span> 버튼을 눌러주세요.</p>
                  <button 
                    onClick={handleManualMail}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={18} />
                    메일 앱으로 전송하기
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="font-bold mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    직접 메일 쓰기 (수동)
                  </p>
                  <p className="text-sm text-gray-600 mb-4">메일 앱이 자동으로 열리지 않는다면 아래 정보를 복사하여 직접 보내주세요.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={handleCopyEmail}
                      className="bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                    >
                      이메일 주소 복사
                    </button>
                    <button 
                      onClick={handleCopyContent}
                      className="bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                    >
                      문의 내용 복사
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-gray-400 text-sm hover:underline"
                >
                  새로운 문의 작성하기
                </button>
              </div>
            </motion.div>
          ) : (
            <form 
              ref={formRef}
              className="space-y-5 md:space-y-6"
              onSubmit={handleSubmit}
            >
              {submissionError && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                  {submissionError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">이름</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm md:text-base" 
                    placeholder="성함을 입력하세요" 
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-bold mb-2">연락처</label>
                  <input 
                    name="phone"
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm md:text-base" 
                    placeholder="010-0000-0000" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-bold mb-2">문의 내용</label>
                <textarea 
                  name="content"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 h-32 text-sm md:text-base" 
                  placeholder="문의하실 내용을 상세히 적어주세요"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-base md:text-lg active:scale-95 transform transition-transform"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    전송 중...
                  </>
                ) : (
                  "문의 접수하기"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
