'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserData } from '../../AuthProvider';
import { setCookie } from '../../utils/cookies';

export interface LoginProps {
  /** 로그인 후 리디렉션할 기본 경로 */
  defaultRedirectPath?: string;
  /** 로그인 핸들러 함수 */
  onLogin?: (email: string, password: string) => Promise<{ success: boolean; message?: string; userData?: UserData }>;
  /** 회원가입 페이지 경로 */
  registerPath?: string;
  /** 비밀번호 재설정 페이지 경로 */
  forgotPasswordPath?: string;
  /** 로그인 성공 후 실행될 콜백 */
  onSuccess?: () => void;
  /** 쿠키 도메인 (기본값: 현재 도메인) */
  cookieDomain?: string;
  /** 공유 쿠키인지 여부 */
  isSharedCookie?: boolean;
}

export function Login({
  defaultRedirectPath = '/',
  onLogin,
  registerPath = '/register',
  forgotPasswordPath = '/forgot-password',
  onSuccess,
  cookieDomain,
  isSharedCookie = true
}: LoginProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || defaultRedirectPath;
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (onLogin) {
        // 커스텀 로그인 함수 사용
        const result = await onLogin(email, password);
        if (!result.success) {
          setError(result.message || '로그인에 실패했습니다.');
          return;
        }

        // AuthContext에 사용자 정보 설정
        if (result.userData) {
          login(result.userData);
        } else {
          // 기본 사용자 정보
          login({
            id: Date.now().toString(),
            name: email.split('@')[0],
            email: email
          });
        }
      } else {
        // 기본 로그인 처리 (시뮬레이션)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 로그인 성공 시 AuthContext 업데이트
        login({
          id: Date.now().toString(),
          name: email.split('@')[0],
          email: email
        });
        
        // 로그인 성공 시 쿠키에 토큰 저장 (유틸리티 사용)
        // Note: AuthProvider가 이미 setCookie를 호출하므로 이 부분은 필요없을 수 있음
        setCookie('authToken', 'example-token', {
          maxAge: 3600,
          shared: isSharedCookie,
          domain: cookieDomain
        });
      }
      
      // 성공 콜백 실행
      if (onSuccess) {
        onSuccess();
      }
      
      // 이전 페이지 또는 홈으로 리디렉션
      router.push(from);
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">로그인</h1>
          <p className="text-gray-600">
            계정이 없으신가요? <Link href={registerPath} className="text-blue-600 hover:underline">회원가입</Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                로그인 상태 유지
              </label>
            </div>
            
            <div className="text-sm">
              <Link href={forgotPasswordPath} className="text-blue-600 hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 