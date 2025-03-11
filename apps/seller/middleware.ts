import { createAuthMiddleware } from '@pnpm-monorepo/auth';

// 판매자 앱 설정으로 미들웨어 생성
export const middleware = createAuthMiddleware({
  // 판매자 전용 보호 경로
  protectedRoutes: ['/dashboard', '/products', '/orders', '/settings', '/analytics'],
  publicRoutes: ['/', '/login', '/register', '/forgot-password'],
  loginPath: '/login',
  homePath: '/dashboard', // 로그인 후 대시보드로 이동
  tokenName: 'authToken' // 고객용 토큰과 동일한 이름 사용
});

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 