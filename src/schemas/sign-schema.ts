import { z } from 'zod';
import { emailSchema } from './email-schema';
import { passwordSchema } from './password-schema';

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: passwordSchema,
});

export { signInSchema, signUpSchema };
