'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@pnpm-monorepo/auth';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  
  // 로그인 상태 확인
  useEffect(() => {
    if (!isLoading && !user) {
      // 로그인이 안되어 있으면 로그인 페이지로 리디렉션
      router.replace('/login');
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  
  if (!user) {
    return <div className="p-8 text-center">로그인이 필요합니다...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">내 프로필</h1>
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">사용자 정보</h2>
          <p className="mt-1 text-sm text-gray-500">개인 계정 정보와 설정</p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">이름</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">이메일 주소</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email || '이메일 정보 없음'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">사용자 역할</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.role || '역할 정보 없음'}</dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">계정 보안</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-3"
                  onClick={() => alert('비밀번호 변경 기능은 아직 구현되지 않았습니다.')}
                >
                  비밀번호 변경
                </button>
                
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 