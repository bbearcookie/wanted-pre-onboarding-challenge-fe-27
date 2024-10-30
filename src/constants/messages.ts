import { josa } from 'es-hangul';

const requiredFieldMsg = (fieldName: string): string =>
  `${josa(fieldName, '을/를')} 입력해주세요.`;

const minLengthFieldMsg = (fieldName: string, minLength: number): string =>
  `${josa(fieldName, '은/는')} ${minLength}자 이상이어야 합니다.`;

const maxLengthFieldMsg = (fieldName: string, maxLength: number): string =>
  `${josa(fieldName, '은/는')} ${maxLength}자 이하여야 합니다.`;

const EMAIL_FORMAT_MSG = '이메일 형식이 올바르지 않습니다.';
const PASSWORD_NOT_MATCH_MSG = '비밀번호가 일치하지 않습니다.';

const MESSAGES = {
  requiredFieldMsg,
  minLengthFieldMsg,
  maxLengthFieldMsg,
  EMAIL_FORMAT_MSG,
  PASSWORD_NOT_MATCH_MSG,
} as const;

export { MESSAGES };
