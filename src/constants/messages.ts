import { josa } from 'es-hangul';

const requiredFieldMsg = (fieldName: string): string =>
  `${josa(fieldName, '을/를')} 입력해주세요.`;

const minLengthFieldMsg = (fieldName: string, minLength: number): string =>
  `${josa(fieldName, '은/는')} ${minLength}자 이상이어야 합니다.`;

const EMAIL_FORMAT_MSG = '이메일 형식이 올바르지 않습니다.';

const MESSAGES = {
  requiredFieldMsg,
  minLengthFieldMsg,
  EMAIL_FORMAT_MSG,
} as const;

export { MESSAGES };
