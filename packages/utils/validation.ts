/**
 * 이메일 주소의 유효성을 검사합니다.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 유효성을 검사합니다. (8자 이상, 영문+숫자+특수문자)
 */
export function isValidPassword(password: string): boolean {
  // 8자 이상, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수문자
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * 한국 휴대전화 번호 유효성을 검사합니다.
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // 010, 011, 016, 017, 018, 019로 시작하는 3-4-4 또는 3-3-4 패턴
  const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return phoneRegex.test(phoneNumber);
} 