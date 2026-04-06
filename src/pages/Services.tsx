import { motion } from 'motion/react';
import { Play, Truck, Calendar, Zap } from 'lucide-react';
import { EditableText, EditableImage, EditableVideo } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';
import { cn } from '@/src/lib/utils';

export default function Services() {
  const { content } = useContent();

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <EditableText contentPath="services.title" as="h1" className="text-3xl md:text-4xl font-heading font-bold mb-4" />
          <EditableText contentPath="services.subtitle" as="p" className="text-base md:text-lg text-gray-600" />
        </motion.div>

        {/* Cooking Guide */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2">
            <Zap className="text-yellow-500" size={24} /> 10분 완성 간편 조리 가이드
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <EditableVideo 
                  contentPath="services.video.videoUrl" 
                  className="w-full aspect-video" 
                />
              </div>
              <div className="p-4 md:p-6 bg-background rounded-2xl border border-gray-100 font-bold text-lg md:text-xl text-center md:text-left">
                <EditableText contentPath="services.video.title" />
              </div>
            </div>
            <div className="space-y-4">
              {content.services.guides.map((_, idx) => (
                <div key={idx} className="p-5 md:p-6 rounded-2xl bg-background border border-gray-100 hover:shadow-md transition-shadow">
                  <EditableText contentPath={`services.guides.${idx}.title`} as="h3" className="font-bold mb-2 text-base md:text-lg" />
                  <EditableText contentPath={`services.guides.${idx}.desc`} as="p" className="text-sm md:text-base text-gray-600 leading-relaxed" multiline />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
