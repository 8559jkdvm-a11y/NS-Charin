import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/src/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface AdminContextType {
  isAdmin: boolean;
  user: User | null;
  login: (id: string, pw: string) => boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('is_admin') === 'true';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // If user is the specific admin email, grant admin status
      if (currentUser?.email === '8559jkdvm@gmail.com') {
        setIsAdmin(true);
        localStorage.setItem('is_admin', 'true');
      }
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Google login failed:", error);
      // Provide more context for common errors
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error("이 도메인은 Firebase에서 허용되지 않았습니다. Firebase 콘솔에서 도메인을 추가해 주세요.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error("로그인 팝업이 닫혔습니다.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error("이전 로그인 요청이 아직 처리 중입니다.");
      }
      throw error;
    }
  };

  const login = (id: string, pw: string) => {
    if (id === 'admin' && pw === '1234') {
      setIsAdmin(true);
      localStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = async () => {
    await signOut(auth);
    setIsAdmin(false);
    localStorage.removeItem('is_admin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, user, login, loginWithGoogle, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
