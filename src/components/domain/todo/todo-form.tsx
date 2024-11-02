import { todoSchema } from '@/schemas/todo-schema';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Form, { FormProps } from '@/components/feature/form';

interface TodoFormProps extends FormProps<z.infer<typeof todoSchema>> {
  disabled?: boolean;
  children?: React.ReactNode;
}

const TodoForm = ({
  form,
  onSubmit,
  onError,
  disabled,
  children,
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
          disabled={disabled}
          id="title"
          placeholder="할 일의 제목을 입력해주세요"
          {...register('title')}
        />
      </div>
      <Textarea
        disabled={disabled}
        placeholder="내용을 입력해주세요."
        rows={15}
        {...register('content')}
      />
      {children}
    </Form>
  );
};

export default TodoForm;
