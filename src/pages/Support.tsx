import { motion } from 'motion/react';
import { MessageSquare, Phone, HelpCircle, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { EditableText } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';
import emailjs from '@emailjs/browser';

export default function Support() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { content } = useContent();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('content') as string;

    // EmailJS Configuration - Get these from your EmailJS dashboard (emailjs.com)
    const meta = import.meta as any;
    const SERVICE_ID = meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // If IDs are not set, fallback to mailto immediately
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn("EmailJS not configured. Falling back to mailto.");
        const subject = encodeURIComponent(`[차린 1:1 문의] ${name}님`);
        const body = encodeURIComponent(`이름: ${name}\n연락처: ${phone}\n\n문의내용:\n${message}`);
        const mailtoUrl = `mailto:nh173806-2@nonghyup.com?subject=${subject}&body=${body}`;
        window.open(mailtoUrl, '_blank');
        setIsSubmitted(true);
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_phone: phone,
          message: message,
          to_email: 'nh173806-2@nonghyup.com'
        },
        PUBLIC_KEY
      );
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Fallback to mailto if EmailJS is not configured or fails
      const subject = encodeURIComponent(`[차린 1:1 문의] ${name}님`);
      const body = encodeURIComponent(`이름: ${name}\n연락처: ${phone}\n\n문의내용:\n${message}`);
      const mailtoUrl = `mailto:nh173806-2@nonghyup.com?subject=${subject}&body=${body}`;
      
      // Use window.open for better iframe compatibility
      window.open(mailtoUrl, '_blank');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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
              className="text-center py-8 md:py-12"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">문의가 접수되었습니다</h3>
              <p className="text-sm md:text-base text-gray-600 mb-8">담당자가 확인 후 연락드리겠습니다.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-primary font-bold hover:underline"
              >
                추가 문의하기
              </button>
            </motion.div>
          ) : (
            <form 
              ref={formRef}
              className="space-y-5 md:space-y-6"
              onSubmit={handleSubmit}
            >
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
