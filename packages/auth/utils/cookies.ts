/**
 * 공유 쿠키 설정 유틸리티
 */

/**
 * 현재 도메인의 루트 도메인을 추출합니다.
 */
export function getRootDomain(hostname: string): string | null {
  if (!hostname || hostname === 'localhost') return null;
  
  // 단순한 버전: 마지막 두 부분을 root domain으로 간주
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return parts.slice(-2).join('.');
  }
  
  return null;
}

/**
 * 쿠키를 설정합니다 (공유 도메인 옵션 포함)
 */
export function setCookie(
  name: string, 
  value: string, 
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    shared?: boolean;
    domain?: string;
  } = {}
): void {
  const {
    maxAge = 3600,
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'lax',
    shared = true,
    domain,
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}; max-age=${maxAge}`;
  
  if (secure) cookieString += '; secure';
  if (sameSite) cookieString += `; samesite=${sameSite}`;
  
  // 공유 쿠키 설정
  if (shared && typeof window !== 'undefined') {
    const rootDomain = domain || getRootDomain(window.location.hostname);
    if (rootDomain) {
      cookieString += `; domain=.${rootDomain}`;
    }
  }
  
  document.cookie = cookieString;
}

/**
 * 쿠키를 삭제합니다 (모든 도메인 레벨에서)
 */
export function deleteCookie(name: string, options: { path?: string; domain?: string; shared?: boolean } = {}): void {
  const { path = '/', shared = true, domain } = options;
  
  // 기본 쿠키 삭제
  document.cookie = `${name}=; path=${path}; max-age=0`;
  
  // 공유 쿠키 삭제
  if (shared && typeof window !== 'undefined') {
    const rootDomain = domain || getRootDomain(window.location.hostname);
    if (rootDomain) {
      document.cookie = `${name}=; path=${path}; domain=.${rootDomain}; max-age=0`;
    }
  }
}

/**
 * 쿠키 값을 가져옵니다
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
} 