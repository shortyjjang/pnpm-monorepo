import { NextRequest, NextResponse } from 'next/server';

export interface AuthMiddlewareOptions {
  // 보호된 경로 (로그인 필요)
  protectedRoutes?: string[];
  // 로그인이 필요없는 경로
  publicRoutes?: string[];
  // 로그인 페이지 경로
  loginPath?: string;
  // 홈 경로
  homePath?: string;
  // 토큰 쿠키 이름
  tokenName?: string;
}

const defaultOptions: AuthMiddlewareOptions = {
  protectedRoutes: ['/profile', '/orders', '/cart'],
  publicRoutes: ['/', '/login', '/register', '/products'],
  loginPath: '/login',
  homePath: '/',
  tokenName: 'authToken'
};

export function createAuthMiddleware(options: AuthMiddlewareOptions = {}) {
  const mergedOptions = { ...defaultOptions, ...options };
  const { protectedRoutes, loginPath, homePath, tokenName } = mergedOptions;
  
  return function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // 로그인 토큰 확인
    const token = request.cookies.get(tokenName || 'authToken')?.value;
    
    // 보호된 경로인지 확인
    const isProtectedRoute = (protectedRoutes || []).some(route => 
      pathname.startsWith(route)
    );
    
    // 보호된 경로이며 토큰이 없는 경우 로그인 페이지로 리디렉션
    if (isProtectedRoute && !token) {
      const url = new URL(loginPath || '/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
    
    // 이미 로그인된 상태에서 로그인/회원가입 페이지 접근시 홈으로 리디렉션
    if (token && pathname === (loginPath || '/login')) {
      return NextResponse.redirect(new URL(homePath || '/', request.url));
    }
    
    // 그 외의 경우는 정상 진행
    return NextResponse.next();
  };
} 