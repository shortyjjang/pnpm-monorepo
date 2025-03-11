'use client';

import { Login, UserData } from '@pnpm-monorepo/auth';

// 고객용 로그인 처리 함수
const handleCustomerLogin = async (email: string, password: string) => {
  // API 호출을 시뮬레이션
  console.log('고객 로그인 시도:', email);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 실제 서비스에서는 API 호출 후 결과 반환
  const userData: UserData = {
    id: `customer-${Date.now()}`,
    name: email.split('@')[0],
    email: email,
    role: 'customer'
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
      onLogin={handleCustomerLogin}
      isSharedCookie={true}
      cookieDomain={process.env.NEXT_PUBLIC_ROOT_DOMAIN || undefined}
      onSuccess={() => {
        // 로그인 성공 시 추가 작업 (예: 분석 이벤트 전송)
        console.log('고객 로그인 성공');
      }}
    />
  );
} 