'use client';

import { useAuth } from '@pnpm-monorepo/auth';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useAuth();
  
  // 로그인 상태 확인
  const isLoggedIn = !!user;
  
  if (isLoading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">관리자 포털</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            {isLoggedIn ? `환영합니다, ${user.name}님` : '관리자 로그인'}
          </h2>
          <p className="mb-6">
            {isLoggedIn 
              ? '관리자 대시보드에서 판매자와 고객을 관리하세요.' 
              : '로그인하여 관리자 기능을 이용하세요.'}
          </p>
          
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  대시보드
                </Link>
                <Link 
                  href="/products" 
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  상품관리
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  로그인
                </Link>
                <Link 
                  href="/register" 
                  className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">관리자 정보</h2>
          <p className="mb-4">관리자 포털에서 제공하는 다양한 기능을 활용하세요.</p>
          {isLoggedIn ? (
            <div className="text-sm text-gray-600">
              <p><strong>역할:</strong> {user.role}</p>
              <p><strong>이메일:</strong> {user.email}</p>
              <p><strong>계정 ID:</strong> {user.id}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">로그인 후 정보를 확인할 수 있습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
