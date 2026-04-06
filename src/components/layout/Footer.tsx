import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Settings, LogOut, RotateCcw } from 'lucide-react';
import { useAdmin } from '@/src/context/AdminContext';
import { useContent } from '@/src/context/ContentContext';
import { EditableText } from '@/src/components/ui/Editable';

export default function Footer() {
  const { isAdmin, logout } = useAdmin();
  const { updateContent } = useContent();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('모든 콘텐츠를 초기 상태로 되돌리시겠습니까?')) {
      localStorage.removeItem('app_content');
      window.location.reload();
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        <div className="sm:col-span-2">
          <EditableText 
            contentPath="footer.brand" 
            as="h2" 
            className="text-white font-heading text-xl font-bold mb-4" 
          />
          <EditableText 
            contentPath="footer.description" 
            as="p" 
            className="text-sm leading-relaxed mb-6 max-w-md opacity-80" 
            multiline={true}
          />
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors p-2 bg-gray-800 rounded-full"><Instagram size={18} /></a>
            <a href="#" className="hover:text-white transition-colors p-2 bg-gray-800 rounded-full"><Facebook size={18} /></a>
            <a href="#" className="hover:text-white transition-colors p-2 bg-gray-800 rounded-full"><Youtube size={18} /></a>
          </div>
        </div>
        
        <div>
          <EditableText 
            contentPath="footer.customerCenter.title" 
            as="h3" 
            className="text-white font-bold mb-5" 
          />
          <div className="space-y-2 opacity-80">
            <EditableText 
              contentPath="footer.customerCenter.phone" 
              as="p" 
              className="text-sm" 
            />
            <EditableText 
              contentPath="footer.customerCenter.hours" 
              as="p" 
              className="text-sm" 
            />
            <EditableText 
              contentPath="footer.customerCenter.lunch" 
              as="p" 
              className="text-sm" 
            />
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-5">정보</h3>
          <ul className="text-sm space-y-3 opacity-80">
            <li><Link to="/about" className="hover:text-white transition-colors">브랜드 스토리</Link></li>
            <li><Link to="/products/details" className="hover:text-white transition-colors">상세정보</Link></li>
            <li><Link to="/support" className="hover:text-white transition-colors">고객지원</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[11px] md:text-xs text-gray-500 text-center md:text-left leading-relaxed">
          <EditableText 
            contentPath="footer.info.copyright" 
            as="p" 
          />
          <EditableText 
            contentPath="footer.info.address" 
            as="p" 
            className="mt-2" 
            multiline={true}
          />
        </div>
        
        <div className="flex items-center gap-6">
          {isAdmin && (
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-red-400 font-bold hover:underline"
              title="콘텐츠 초기화"
            >
              <RotateCcw size={14} /> 초기화
            </button>
          )}
          {isAdmin ? (
            <button 
              onClick={logout}
              className="flex items-center gap-1 text-xs text-primary font-bold hover:underline"
            >
              <LogOut size={14} /> 로그아웃 (관리자 모드)
            </button>
          ) : (
            <Link to="/admin" className="text-gray-600 hover:text-white transition-colors p-2">
              <Settings size={18} />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
