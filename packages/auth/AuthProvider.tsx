"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from './utils/cookies';

export type UserData = { 
  id: string;
  name: string;
  email?: string;
  role?: 'customer' | 'seller' | 'admin'; 
};

export type User = UserData | null;

export interface AuthContextType { 
  user: User; 
  setUser: (user: User) => void;
  login: (userData: UserData) => void; 
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 마운트 시 쿠키에서 사용자 정보 확인
  useEffect(() => {
    const initAuth = () => {
      setIsLoading(true);
      
      try {
        // 쿠키로부터 토큰과 사용자 정보 불러오기
        const token = getCookie('authToken');
        const userInfo = getCookie('authUser');
        
        if (token && userInfo) {
          try {
            // 문자열로 저장된 사용자 정보를 객체로 파싱
            const userData = JSON.parse(decodeURIComponent(userInfo));
            setUser(userData);
          } catch (e) {
            console.error('사용자 데이터 파싱 오류:', e);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error('인증 초기화 오류:', e);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
    
    // 다른 탭/창과 동기화를 위한 이벤트 리스너
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'authUser') {
        initAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 사용자 로그인
  const login = (userData: UserData) => {
    // 사용자 데이터 설정
    setUser(userData);
    
    // 토큰 저장 (실제 서비스에서는 JWT 토큰)
    setCookie('authToken', 'example-token', { 
      maxAge: 3600, 
      shared: true 
    });
    
    // 사용자 정보를 쿠키에 저장 (인코딩하여 저장)
    setCookie('authUser', encodeURIComponent(JSON.stringify(userData)), { 
      maxAge: 3600, 
      shared: true 
    });
    
    // localStorage 변경 이벤트 발생시키기 (다른 탭과 동기화)
    localStorage.setItem('auth_sync', Date.now().toString());
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    
    // 쿠키 삭제
    deleteCookie('authToken', { shared: true });
    deleteCookie('authUser', { shared: true });
    
    // localStorage 변경 이벤트 발생시키기 (다른 탭과 동기화)
    localStorage.setItem('auth_sync', Date.now().toString());
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};