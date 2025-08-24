/**
* @file validationMessages.ts
* @description
* 유효성 검사에 사용되는 정규식(regex)과
* 사용자에게 표시되는 에러 메시지를 상수로 정의한 파일입니다.
*/

// email
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const ERROR_EMAIL_CHECK = '이메일 형식을 확인해주세요.';

// password
export const ERROR_PASSWORD_CHECK = '비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.'
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const ERROR_PASSWORD_MIN = '비밀번호는 최소 8자 이상이어야 합니다.'
export const ERROR_PASSWORD_MAX = '비밀번호는 최대 20자까지 입력할 수 있습니다.'
export const ERROR_PASSWORD_AGAIN = '비밀번호를 한 번 더 입력해 주세요.'
export const ERROR_PASSWORD_DIFFERENT = '현재 비밀번호와 맞지 않습니다.'

// signin
export const ERROR_LOGIN = '이메일 또는 비밀번호를 확인해 주세요.'

// signup
export const ERROR_SIGNUP = '회원가입에 실패했습니다. 다시 시도해주세요.'