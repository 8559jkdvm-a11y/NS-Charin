import React, { useState } from 'react';
import { useAdmin } from '@/src/context/AdminContext';
import { useContent } from '@/src/context/ContentContext';
import { RotateCcw, Copy, X, ShieldCheck, CloudUpload, LogIn, Loader2 } from 'lucide-react';

export default function AdminToolbar() {
  const { isAdmin, logout, user, loginWithGoogle } = useAdmin();
  const { clearStorage, syncToCloud, isSyncing } = useContent();
  const [isPublishing, setIsPublishing] = useState(false);

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

  const handlePublish = async () => {
    if (!user) {
      alert("클라우드에 저장하려면 먼저 구글 로그인이 필요합니다.");
      try {
        await loginWithGoogle();
      } catch (e) {
        return;
      }
    }

    if (window.confirm('현재 수정된 내용을 클라우드에 게시하시겠습니까? 모든 사용자에게 즉시 반영됩니다.')) {
      setIsPublishing(true);
      try {
        await syncToCloud();
        alert("클라우드에 성공적으로 게시되었습니다!");
      } catch (e) {
        alert("게시 중 오류가 발생했습니다. 권한을 확인해 주세요.");
      } finally {
        setIsPublishing(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <div className="bg-primary text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 pointer-events-auto border-2 border-white/20 backdrop-blur-md">
        <div className="flex flex-col border-r border-white/20 pr-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-400" />
            <span className="text-sm font-bold">관리자 모드</span>
          </div>
          {user ? (
            <span className="text-[10px] text-white/60 truncate max-w-[100px]">{user.email}</span>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="text-[10px] text-blue-300 hover:text-blue-200 flex items-center gap-1"
            >
              <LogIn size={10} /> 구글 로그인
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePublish}
            disabled={isPublishing || isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title="수정된 내용을 클라우드에 게시하여 모든 사용자에게 반영합니다"
          >
            {isPublishing || isSyncing ? <Loader2 size={14} className="animate-spin" /> : <CloudUpload size={14} />}
            클라우드 게시
          </button>

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
