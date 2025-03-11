import { createAuthMiddleware } from '@pnpm-monorepo/auth';

// 각 앱별 설정으로 미들웨어 생성
export const middleware = createAuthMiddleware({
  protectedRoutes: ['/profile', '/orders', '/cart', '/checkout'],
  publicRoutes: ['/', '/login', '/register', '/products', '/product'],
  loginPath: '/login',
  homePath: '/',
  tokenName: 'authToken'
});

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 