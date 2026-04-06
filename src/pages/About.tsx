import { motion } from 'motion/react';
import { Users, MapPin, Award, Leaf } from 'lucide-react';
import { EditableText, EditableImage } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';

export default function About() {
  const { content } = useContent();

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <EditableText contentPath="about.title" as="h1" className="text-3xl md:text-5xl font-heading font-bold mb-4 md:mb-6" />
          <EditableText contentPath="about.subtitle" as="p" className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" multiline />
        </motion.div>

        {/* CEO Message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-32">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5] md:h-[500px]">
            <EditableImage contentPath="about.ceo.image" className="w-full h-full object-cover" alt="CEO" />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 md:mb-8 text-primary">조합장 인사말</h2>
            <EditableText 
              contentPath="about.ceo.message" 
              as="p" 
              className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed" 
              multiline 
            />
            <EditableText 
              contentPath="about.ceo.subMessage" 
              as="p" 
              className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed" 
              multiline 
            />
            <div className="border-t pt-6 inline-block lg:block">
              <p className="font-bold text-lg md:text-xl">
                논산계룡축협 조합장 <EditableText contentPath="about.ceo.name" as="span" className="text-primary" />
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
          {content.about.values.map((_: any, idx: number) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-secondary flex justify-center mb-4">
                {idx === 0 ? <Users className="w-7 h-7 md:w-8 md:h-8" /> : 
                 idx === 1 ? <MapPin className="w-7 h-7 md:w-8 md:h-8" /> : 
                 idx === 2 ? <Award className="w-7 h-7 md:w-8 md:h-8" /> : 
                 <Leaf className="w-7 h-7 md:w-8 md:h-8" />}
              </div>
              <EditableText contentPath={`about.values.${idx}.title`} as="h3" className="font-bold text-base md:text-lg mb-2" />
              <EditableText contentPath={`about.values.${idx}.desc`} as="p" className="text-xs md:text-sm text-gray-500" />
            </div>
          ))}
        </div>

        {/* Factory Info */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden">
          <div className="text-center mb-10 md:mb-12">
            <EditableText contentPath="about.factory.title" as="h2" className="text-2xl md:text-3xl font-heading font-bold mb-4" />
            <EditableText contentPath="about.factory.subtitle" as="p" className="text-sm md:text-base text-gray-600" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {content.about.factory.images.map((_: any, idx: number) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-sm">
                <EditableImage contentPath={`about.factory.images.${idx}`} className="w-full aspect-video md:h-64 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
