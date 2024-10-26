import { MESSAGES } from '@/constants/messages';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .trim()
  .min(8, MESSAGES.minLengthFieldMsg('비밀번호', 8));

export { passwordSchema };
