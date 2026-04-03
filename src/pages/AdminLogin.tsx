import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/src/context/AdminContext';
import { useContent } from '@/src/context/ContentContext';
import { motion } from 'motion/react';
import { Lock, User, Key, Trash2, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAdmin();
  const { clearStorage, storageError } = useContent();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (e) {
      setError('구글 로그인에 실패했습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(id, pw)) {
      navigate('/');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleReset = () => {
    if (confirm('모든 수정 사항을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      clearStorage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-heading font-bold">관리자 로그인</h1>
          <p className="text-gray-500 mt-2">페이지 수정을 위해 로그인해 주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center gap-2">
              <User size={16} /> 아이디
            </label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 flex items-center gap-2">
              <Key size={16} /> 비밀번호
            </label>
            <input 
              type="password" 
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="1234"
              required
            />
          </div>
          
          {error && <p className="text-primary text-sm font-medium text-center">{error}</p>}
          {storageError && <p className="text-red-500 text-xs text-center bg-red-50 p-2 rounded-lg">{storageError}</p>}

          <button 
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
          >
            로그인
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">또는</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
          >
            <LogIn size={20} className="text-blue-500" />
            구글 계정으로 로그인
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t flex flex-col gap-4 items-center">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-red-500 text-sm hover:text-red-700 transition-colors"
          >
            <Trash2 size={14} /> 모든 수정 사항 초기화
          </button>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 text-sm hover:text-gray-600"
          >
            홈으로 돌아가기
          </button>
        </div>
      </motion.div>
    </div>
  );
}
