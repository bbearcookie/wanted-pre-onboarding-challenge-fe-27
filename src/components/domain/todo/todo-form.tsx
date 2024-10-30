import { todoSchema } from '@/schemas/todo-schema';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Form, { FormProps } from '@/components/feature/form';

interface TodoFormProps extends FormProps<z.infer<typeof todoSchema>> {
  submitButtonText?: string;
}

const TodoForm = ({
  form,
  onSubmit,
  onError,
  submitButtonText = '추가',
  ...props
}: TodoFormProps) => {
  const { register } = form;

  return (
    <Form {...props} form={form} onSubmit={onSubmit} onError={onError}>
      <div className="flex gap-4">
        <Label
          htmlFor="title"
          className="flex w-12 items-center justify-center"
        >
          <Typography variant="largeText">제목</Typography>
        </Label>
        <Input
          id="title"
          placeholder="할 일의 제목을 입력해주세요"
          {...register('title')}
        />
      </div>
      <Textarea
        placeholder="내용을 입력해주세요."
        rows={15}
        {...register('content')}
      />
      <div className="flex justify-end">
        <Button>{submitButtonText}</Button>
      </div>
    </Form>
  );
};

export default TodoForm;
