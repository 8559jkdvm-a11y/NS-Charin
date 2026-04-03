import React from 'react';
import { useAdmin } from '@/src/context/AdminContext';
import { useContent } from '@/src/context/ContentContext';
import { RotateCcw, Copy, X, ShieldCheck } from 'lucide-react';

export default function AdminToolbar() {
  const { isAdmin, logout } = useAdmin();
  const { clearStorage } = useContent();

  if (!isAdmin) return null;

  const handleCopyConfig = () => {
    const data = localStorage.getItem('app_content');
    if (data) {
      navigator.clipboard.writeText(data);
      alert("수정된 모든 데이터가 복사되었습니다! 이 내용을 대화창에 붙여넣어 주세요.");
    } else {
      alert("수정된 데이터가 없습니다.");
    }
  };

  const handleReset = () => {
    if (window.confirm('모든 수정 사항을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      clearStorage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <div className="bg-primary text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 pointer-events-auto border-2 border-white/20 backdrop-blur-md">
        <div className="flex items-center gap-2 border-r border-white/20 pr-4">
          <ShieldCheck size={18} className="text-green-400" />
          <span className="text-sm font-bold">관리자 모드</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopyConfig}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
            title="수정된 데이터를 복사하여 AI에게 전달합니다"
          >
            <Copy size={14} />
            데이터 복사
          </button>
          
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
            title="모든 수정을 초기화하고 기본값으로 되돌립니다"
          >
            <RotateCcw size={14} />
            초기화
          </button>
          
          <button 
            onClick={logout}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
            title="로그아웃"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 text-right pr-2">수정 후 '데이터 복사'를 눌러 AI에게 전달하세요.</p>
    </div>
  );
}
