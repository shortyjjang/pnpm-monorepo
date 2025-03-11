'use client';

import { Login, UserData } from '@pnpm-monorepo/auth';

// 관리자용 로그인 처리 함수
const handleAdminLogin = async (email: string, password: string) => {
  // API 호출을 시뮬레이션
  console.log('관리자 로그인 시도:', email);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 실제 서비스에서는 API 호출 후 결과 반환
  const userData: UserData = {
    id: `admin-${Date.now()}`,
    name: email.split('@')[0],
    email: email,
    role: 'admin'
  };
  
  return { 
    success: true,
    userData
  };
};

export default function LoginPage() {
  return (
    <Login
      defaultRedirectPath="/"
      registerPath="/register"
      forgotPasswordPath="/forgot-password"
      onLogin={handleAdminLogin}
      isSharedCookie={true}
      cookieDomain={process.env.NEXT_PUBLIC_ROOT_DOMAIN || undefined}
      onSuccess={() => {
        // 로그인 성공 시 추가 작업 (예: 분석 이벤트 전송)
        console.log('관리자 로그인 성공');
      }}
    />
  );
} 