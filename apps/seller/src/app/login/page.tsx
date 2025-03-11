'use client';

import { Login, UserData } from '@pnpm-monorepo/auth';

// 판매자용 로그인 처리 함수
const handleSellerLogin = async (email: string, password: string) => {
  // API 호출을 시뮬레이션
  console.log('판매자 로그인 시도:', email);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 실제 서비스에서는 API 호출 후 결과 반환
  const userData: UserData = {
    id: `seller-${Date.now()}`,
    name: email.split('@')[0],
    email: email,
    role: 'seller'
  };
  
  return { 
    success: true,
    userData
  };
};

export default function LoginPage() {
  return (
    <Login
      defaultRedirectPath="/dashboard"
      registerPath="/register"
      forgotPasswordPath="/forgot-password"
      onLogin={handleSellerLogin}
      isSharedCookie={true} // 모든 앱에서 공유
      cookieDomain={process.env.NEXT_PUBLIC_ROOT_DOMAIN || undefined}
      onSuccess={() => {
        // 로그인 성공 시 추가 작업 (예: 분석 이벤트 전송)
        console.log('판매자 로그인 성공');
      }}
    />
  );
} 