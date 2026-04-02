import { motion } from 'motion/react';
import { Users, MapPin, Award, Leaf } from 'lucide-react';
import { EditableText, EditableImage } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';

export default function About() {
  const { content } = useContent();

  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <EditableText contentPath="about.title" as="h1" className="text-4xl md:text-5xl font-heading font-bold mb-6" />
          <EditableText contentPath="about.subtitle" as="p" className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" multiline />
        </motion.div>

        {/* CEO Message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="rounded-3xl overflow-hidden shadow-xl h-[500px]">
            <EditableImage contentPath="about.ceo.image" className="w-full h-full" alt="CEO" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold mb-8">조합장 인사말</h2>
            <EditableText 
              contentPath="about.ceo.message" 
              as="p" 
              className="text-lg text-gray-600 mb-6 leading-relaxed" 
              multiline 
            />
            <EditableText 
              contentPath="about.ceo.subMessage" 
              as="p" 
              className="text-lg text-gray-600 mb-10 leading-relaxed" 
              multiline 
            />
            <div className="border-t pt-6">
              <p className="font-bold text-xl">
                논산계룡축협 조합장 <EditableText contentPath="about.ceo.name" as="span" className="text-primary" />
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32">
          {content.about.values.map((_: any, idx: number) => (
            <div key={idx} className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100">
              <div className="text-secondary flex justify-center mb-4">
                {idx === 0 ? <Users size={32} /> : 
                 idx === 1 ? <MapPin size={32} /> : 
                 idx === 2 ? <Award size={32} /> : 
                 <Leaf size={32} />}
              </div>
              <EditableText contentPath={`about.values.${idx}.title`} as="h3" className="font-bold text-lg mb-2" />
              <EditableText contentPath={`about.values.${idx}.desc`} as="p" className="text-sm text-gray-500" />
            </div>
          ))}
        </div>

        {/* Factory Info */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 overflow-hidden">
          <div className="text-center mb-12">
            <EditableText contentPath="about.factory.title" as="h2" className="text-3xl font-heading font-bold mb-4" />
            <EditableText contentPath="about.factory.subtitle" as="p" className="text-gray-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.about.factory.images.map((_: any, idx: number) => (
              <div key={idx}>
                <EditableImage contentPath={`about.factory.images.${idx}`} className="rounded-2xl h-64" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
