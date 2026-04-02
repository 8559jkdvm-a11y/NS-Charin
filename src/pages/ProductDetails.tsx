import { motion } from 'motion/react';
import { Info, Check } from 'lucide-react';
import { EditableText, EditableImage } from '@/src/components/ui/Editable';
import { useContent } from '@/src/context/ContentContext';

export default function ProductDetails() {
  const { content } = useContent();

  return (
    <div className="pt-32 pb-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <EditableText contentPath="details.title" as="h1" className="text-4xl font-heading font-bold mb-4" />
          <EditableText contentPath="details.subtitle" as="p" className="text-xl text-gray-600" />
        </motion.div>

        <div className="space-y-32">
          {content.details.products.map((_: any, idx: number) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <EditableImage 
                  contentPath={`details.products.${idx}.images.main`} 
                  className="rounded-3xl w-full shadow-lg h-[500px]" 
                  alt="Product Package" 
                />
              </div>

              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Info className="text-primary" /> 제품 스펙
                    </h2>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-1">
                        <Check className="text-secondary" size={20} />
                      </div>
                      <p className="text-[11px] font-extrabold text-gray-500">HACCP 인증</p>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                      <tr className="py-4">
                        <td className="py-4 font-bold text-gray-500 w-32">제품명</td>
                        <td className="py-4"><EditableText contentPath={`details.products.${idx}.specs.name`} /></td>
                      </tr>
                      <tr className="py-4">
                        <td className="py-4 font-bold text-gray-500">중량</td>
                        <td className="py-4"><EditableText contentPath={`details.products.${idx}.specs.weight`} /></td>
                      </tr>
                      <tr className="py-4">
                        <td className="py-4 font-bold text-gray-500">원재료 및 함량</td>
                        <td className="py-4"><EditableText contentPath={`details.products.${idx}.specs.ingredients`} multiline /></td>
                      </tr>
                      <tr className="py-4">
                        <td className="py-4 font-bold text-gray-500">보관방법</td>
                        <td className="py-4"><EditableText contentPath={`details.products.${idx}.specs.storage`} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6 text-center">영양 성분표 (100g당)</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-gray-500 text-base mb-1">칼로리</p>
                      <EditableText contentPath={`details.products.${idx}.nutrition.calories`} className="text-2xl font-bold" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-base mb-1">단백질</p>
                      <EditableText contentPath={`details.products.${idx}.nutrition.protein`} className="text-2xl font-bold" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-base mb-1">지방</p>
                      <EditableText contentPath={`details.products.${idx}.nutrition.fat`} className="text-2xl font-bold" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-base mb-1">나트륨</p>
                      <EditableText contentPath={`details.products.${idx}.nutrition.sodium`} className="text-2xl font-bold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
