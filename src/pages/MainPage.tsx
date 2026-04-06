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
      <section className="relative min-h-[80vh] md:h-screen flex items-center pt-24 pb-12">
        <div className="absolute inset-0 z-0">
          <EditableImage 
            contentPath="main.hero.bgImage" 
            className="w-full h-full object-cover" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center md:text-left"
          >
            <span className="inline-block bg-secondary px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
              <EditableText contentPath="main.hero.badge" />
            </span>
            <EditableText 
              contentPath="main.hero.title" 
              as="h1" 
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-[1.2] md:leading-[1.1] mb-4 md:mb-6" 
              multiline 
            />
            <EditableText 
              contentPath="main.hero.description" 
              as="p" 
              className="text-base md:text-xl opacity-90 mb-8 md:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0" 
              multiline 
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/support" 
                className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full text-base md:text-lg font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
              >
                <EditableText contentPath="main.hero.cta" />
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/about" 
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-full text-base md:text-lg font-bold flex items-center justify-center transition-all active:scale-95"
              >
                <EditableText contentPath="main.hero.secondaryCta" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PainPoint Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <EditableText 
              contentPath="main.painPoints.title" 
              as="h2" 
              className="text-2xl md:text-4xl font-heading font-bold mb-10 md:mb-16" 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {content.main.painPoints.items.map((_, idx) => (
                <div key={idx} className="p-6 md:p-8 rounded-2xl bg-background border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 md:mb-6 flex justify-center">
                    {idx === 0 ? <Clock className="text-primary" size={32} /> : 
                     idx === 1 ? <ShieldCheck className="text-primary" size={32} /> : 
                     <Heart className="text-primary" size={32} />}
                  </div>
                  <EditableText 
                    contentPath={`main.painPoints.items.${idx}.title`} 
                    as="h3" 
                    className="text-lg md:text-xl font-bold mb-3 md:mb-4" 
                  />
                  <EditableText 
                    contentPath={`main.painPoints.items.${idx}.desc`} 
                    as="p" 
                    className="text-sm md:text-base text-gray-600 leading-relaxed" 
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            <motion.div {...fadeIn} className="text-center lg:text-left">
              <span className="text-secondary font-bold mb-2 block text-sm">
                <EditableText contentPath="main.features.feature1.badge" />
              </span>
              <EditableText 
                contentPath="main.features.feature1.title" 
                as="h2" 
                className="text-3xl md:text-4xl font-heading font-bold mb-6" 
                multiline 
              />
              <EditableText 
                contentPath="main.features.feature1.desc" 
                as="p" 
                className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed" 
                multiline 
              />
              <ul className="space-y-4 inline-block text-left">
                {content.main.features.feature1.list.map((_: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 font-medium text-sm md:text-base">
                    <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                    <EditableText contentPath={`main.features.feature1.list.${idx}`} />
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video lg:h-[400px]"
            >
              <EditableImage contentPath="main.features.feature1.image" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-2xl aspect-video lg:h-[400px]"
            >
              <EditableImage contentPath="main.features.feature2.image" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div {...fadeIn} className="order-1 lg:order-2 text-center lg:text-left">
              <span className="text-secondary font-bold mb-2 block text-sm">
                <EditableText contentPath="main.features.feature2.badge" />
              </span>
              <EditableText 
                contentPath="main.features.feature2.title" 
                as="h2" 
                className="text-3xl md:text-4xl font-heading font-bold mb-6" 
                multiline 
              />
              <EditableText 
                contentPath="main.features.feature2.desc" 
                as="p" 
                className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed" 
                multiline 
              />
              <div className="bg-white p-6 rounded-2xl border border-gray-100 text-left">
                <EditableText 
                  contentPath="main.features.feature2.quote" 
                  as="p" 
                  className="italic text-gray-500 text-sm md:text-base" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <EditableText 
              contentPath="main.socialProof.title" 
              as="h2" 
              className="text-2xl md:text-4xl font-heading font-bold mb-4" 
            />
            <div className="flex justify-center gap-1 text-yellow-400 mb-2">
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
            </div>
            <EditableText 
              contentPath="main.socialProof.rating" 
              as="p" 
              className="text-sm md:text-base text-gray-500" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.main.socialProof.reviews.map((_: any, idx: number) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 md:p-8 bg-background rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] md:text-xs font-bold bg-gray-200 px-2 py-1 rounded text-gray-600">
                    <EditableText contentPath={`main.socialProof.reviews.${idx}.tag`} />
                  </span>
                  <span className="text-sm font-bold">
                    <EditableText contentPath={`main.socialProof.reviews.${idx}.name`} />
                  </span>
                </div>
                <EditableText 
                  contentPath={`main.socialProof.reviews.${idx}.content`} 
                  as="p" 
                  className="text-sm md:text-base text-gray-600 leading-relaxed" 
                  multiline 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white overflow-hidden relative">
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
              className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-8" 
              multiline 
            />
            <div className="inline-block bg-white text-primary px-6 md:px-10 py-6 md:py-8 rounded-3xl mb-10 md:mb-12 shadow-xl w-full max-w-sm md:max-w-none">
              <EditableText contentPath="main.promotion.badge" as="p" className="text-lg md:text-xl font-bold mb-2" />
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <EditableText contentPath="main.promotion.priceOriginal" className="line-through text-gray-300 text-2xl md:text-3xl" />
                <EditableText contentPath="main.promotion.priceDiscount" />
              </div>
              <p className="mt-4 text-xs md:text-sm font-medium opacity-80">* 1인 1회 한정 / 선착순 500명</p>
            </div>
            <br />
            <Link 
              to="/support" 
              className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 md:px-12 py-4 md:py-5 rounded-full text-xl md:text-2xl font-bold transition-all transform hover:scale-105 shadow-lg active:scale-95"
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
