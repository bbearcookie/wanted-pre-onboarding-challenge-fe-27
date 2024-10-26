import { MESSAGES } from '@/constants/messages';
import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(1, {
    message: MESSAGES.requiredFieldMsg('이메일'),
  })
  .email({
    message: MESSAGES.EMAIL_FORMAT_MSG,
  });

export { emailSchema };
