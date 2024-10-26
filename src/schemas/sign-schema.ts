import { z } from 'zod';
import { emailSchema } from './email-schema';
import { passwordSchema } from './password-schema';
import { MESSAGES } from '@/constants/messages';

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: MESSAGES.PASSWORD_NOT_MATCH_MSG,
    path: ['passwordConfirm'],
  });

export { signInSchema, signUpSchema };
