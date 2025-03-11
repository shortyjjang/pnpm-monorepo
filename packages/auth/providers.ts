export type AuthProvider = 'credentials' | 'google' | 'kakao' | 'naver';

/**
 * 다양한 인증 제공자 설정 옵션
 */
export interface AuthOptions {
  providers: AuthProvider[];
  secret: string;
  session: {
    strategy: 'jwt' | 'database';
    maxAge: number; // 초 단위
  };
}

/**
 * 기본 인증 설정
 */
export const defaultAuthOptions: AuthOptions = {
  providers: ['credentials'],
  secret: process.env.AUTH_SECRET || 'your-auth-secret-key',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
}; 