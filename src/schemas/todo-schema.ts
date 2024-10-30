import {
  TODO_CONTENT_MAX_LEN,
  TODO_TITLE_MAX_LEN,
} from '@/constants/form-constants';
import { MESSAGES } from '@/constants/messages';
import { z } from 'zod';

const todoSchema = z.object({
  title: z
    .string()
    .min(1, MESSAGES.requiredFieldMsg('제목'))
    .max(
      TODO_TITLE_MAX_LEN,
      MESSAGES.maxLengthFieldMsg('제목', TODO_TITLE_MAX_LEN),
    ),
  content: z
    .string()
    .min(1, MESSAGES.requiredFieldMsg('내용'))
    .max(
      TODO_CONTENT_MAX_LEN,
      MESSAGES.maxLengthFieldMsg('내용', TODO_CONTENT_MAX_LEN),
    ),
});

export { todoSchema };
