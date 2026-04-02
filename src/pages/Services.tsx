import { motion } from 'motion/react';
import { Play, Truck, Calendar, Zap } from 'lucide-react';
import { EditableText, EditableImage, EditableVideo } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';
import { cn } from '@/src/lib/utils';

export default function Services() {
  const { content } = useContent();

  return (
    <div className="pt-32 pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <EditableText contentPath="services.title" as="h1" className="text-4xl font-heading font-bold mb-4" />
          <EditableText contentPath="services.subtitle" as="p" className="text-gray-600" />
        </motion.div>

        {/* Cooking Guide */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Zap className="text-yellow-500" /> 10분 완성 간편 조리 가이드
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <EditableVideo 
                contentPath="services.video.videoUrl" 
                className="w-full aspect-video" 
              />
              <div className="p-4 bg-background rounded-2xl border border-gray-100 font-bold text-xl">
                <EditableText contentPath="services.video.title" />
              </div>
            </div>
            <div className="space-y-4">
              {content.services.guides.map((_, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-background border border-gray-100">
                  <EditableText contentPath={`services.guides.${idx}.title`} as="h3" className="font-bold mb-2" />
                  <EditableText contentPath={`services.guides.${idx}.desc`} as="p" className="text-sm text-gray-600" multiline />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
