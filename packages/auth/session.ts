import { isValidEmail } from '@pnpm-monorepo/utils';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
}

export interface Session {
  user: User;
  expires: Date;
}

/**
 * 사용자 세션 검증
 */
export function validateUserSession(session: Session | null): boolean {
  if (!session || !session.user) return false;
  
  const { user, expires } = session;
  
  // 세션 만료 확인
  if (new Date() > expires) return false;
  
  // 사용자 데이터 검증
  if (!user.id || !user.name || !isValidEmail(user.email)) return false;
  
  return true;
} 