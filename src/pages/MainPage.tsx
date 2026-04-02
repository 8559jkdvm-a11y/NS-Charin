import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditableText, EditableImage } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function MainPage() {
  const { content } = useContent();

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <EditableImage 
            contentPath="main.hero.bgImage" 
            className="w-full h-full" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-secondary px-4 py-1 rounded-full text-sm font-bold mb-6">
              <EditableText contentPath="main.hero.badge" />
            </span>
            <EditableText 
              contentPath="main.hero.title" 
              as="h1" 
              className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] mb-6" 
              multiline 
            />
            <EditableText 
              contentPath="main.hero.description" 
              as="p" 
              className="text-xl opacity-90 mb-10 leading-relaxed" 
              multiline 
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/support" 
                className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105"
              >
                <EditableText contentPath="main.hero.cta" />
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/about" 
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center transition-all"
              >
                <EditableText contentPath="main.hero.secondaryCta" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PainPoint Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <EditableText 
              contentPath="main.painPoints.title" 
              as="h2" 
              className="text-3xl md:text-4xl font-heading font-bold mb-16" 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.main.painPoints.items.map((_, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-background border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6 flex justify-center">
                    {idx === 0 ? <Clock className="text-primary" size={40} /> : 
                     idx === 1 ? <ShieldCheck className="text-primary" size={40} /> : 
                     <Heart className="text-primary" size={40} />}
                  </div>
                  <EditableText 
                    contentPath={`main.painPoints.items.${idx}.title`} 
                    as="h3" 
                    className="text-xl font-bold mb-4" 
                  />
                  <EditableText 
                    contentPath={`main.painPoints.items.${idx}.desc`} 
                    as="p" 
                    className="text-gray-600 leading-relaxed" 
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div {...fadeIn}>
              <span className="text-secondary font-bold mb-2 block">
                <EditableText contentPath="main.features.feature1.badge" />
              </span>
              <EditableText 
                contentPath="main.features.feature1.title" 
                as="h2" 
                className="text-4xl font-heading font-bold mb-6" 
                multiline 
              />
              <EditableText 
                contentPath="main.features.feature1.desc" 
                as="p" 
                className="text-lg text-gray-600 mb-8 leading-relaxed" 
                multiline 
              />
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-secondary" /> HACCP 인증 시설 제조
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-secondary" /> 축산물 이력제 100% 적용
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl h-[400px]"
            >
              <EditableImage contentPath="main.features.feature1.image" className="w-full h-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-2xl h-[400px]"
            >
              <EditableImage contentPath="main.features.feature2.image" className="w-full h-full" />
            </motion.div>
            <motion.div {...fadeIn} className="order-1 lg:order-2">
              <span className="text-secondary font-bold mb-2 block">
                <EditableText contentPath="main.features.feature2.badge" />
              </span>
              <EditableText 
                contentPath="main.features.feature2.title" 
                as="h2" 
                className="text-4xl font-heading font-bold mb-6" 
                multiline 
              />
              <EditableText 
                contentPath="main.features.feature2.desc" 
                as="p" 
                className="text-lg text-gray-600 mb-8 leading-relaxed" 
                multiline 
              />
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <p className="italic text-gray-500">"까다로운 엄마들이 먼저 알아본 건강한 레시피"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">이미 많은 부모님들이 경험하셨습니다</h2>
            <div className="flex justify-center gap-1 text-yellow-400 mb-2">
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
            </div>
            <p className="text-gray-500">평균 만족도 4.9 / 5.0</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "김*희 님", content: "맞벌이라 저녁 준비가 늘 전쟁이었는데, 차린 덕분에 10분 만에 훌륭한 식탁이 완성돼요. 아이가 너무 잘 먹어서 뿌듯합니다.", tag: "워킹맘" },
              { name: "이*준 님", content: "고기 질이 확실히 달라요. 축협 제품이라 믿고 샀는데 양념도 자극적이지 않고 고기가 정말 부드럽네요. 재구매 의사 200%입니다.", tag: "요리하는 아빠" },
              { name: "박*연 님", content: "캠핑 갈 때 가져갔는데 인기 폭발이었어요! 포장도 깔끔하고 조리가 간편해서 야외에서도 셰프 소리 들었네요.", tag: "캠핑 매니아" }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 bg-background rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded text-gray-600">{review.tag}</span>
                  <span className="text-sm font-bold">{review.name}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">"{review.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion CTA Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <EditableText 
              contentPath="main.promotion.title" 
              as="h2" 
              className="text-4xl md:text-6xl font-heading font-bold mb-8" 
              multiline 
            />
            <div className="inline-block bg-white text-primary px-10 py-8 rounded-3xl mb-12 shadow-xl">
              <EditableText contentPath="main.promotion.badge" as="p" className="text-xl font-bold mb-2" />
              <div className="text-6xl font-heading font-bold flex items-center justify-center gap-4">
                <EditableText contentPath="main.promotion.priceOriginal" className="line-through text-gray-300 text-3xl" />
                <EditableText contentPath="main.promotion.priceDiscount" />
              </div>
              <p className="mt-4 text-sm font-medium opacity-80">* 1인 1회 한정 / 선착순 500명</p>
            </div>
            <br />
            <Link 
              to="/support" 
              className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-12 py-5 rounded-full text-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              <EditableText contentPath="main.promotion.cta" />
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
