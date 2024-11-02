import { TrashIcon } from '@radix-ui/react-icons';
import { Typography } from '@/components/ui/typography';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo as TodoModel } from '@/api/dtos/todos';
import { formatKoreanDate } from '@/utils/format-korean-date';
import { Link, useMatch } from 'react-router-dom';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/utils/shadcn';
import { useDeleteTodoMutation } from '@/api/mutations/useDeleteTodoMutation';
import { useToast } from '@/hooks/use-toast';
import useStorageState from 'use-storage-state';
import { LOCAL_STORAGE_KEYS } from '@/constants/storage-keys';
import { CheckedState } from '@radix-ui/react-checkbox';

interface TodoProps extends TodoModel {}

const Todo = ({ id, title, content, createdAt, updatedAt }: TodoProps) => {
  const isCurrentTodo = useMatch(ROUTER_PATHS.TODO_DETAIL(id));
  const deleteMutation = useDeleteTodoMutation();
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useStorageState<CheckedState>(
    LOCAL_STORAGE_KEYS.IS_CHECKED_TODO(id),
    {
      defaultValue: false,
      storage: localStorage,
    },
  );

  const handleDelete = () =>
    deleteMutation.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          toast({
            title: '할 일 삭제',
            description: '할 일을 삭제했습니다.',
          });
        },
      },
    );

  return (
    <article
      className={cn(
        'flex items-center gap-4 rounded-sm border-2 border-transparent bg-white px-4 py-2',
        isCurrentTodo && 'border-primary',
      )}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={(isChecked) => setIsChecked(isChecked)}
        onChange={(e) => {
          console.log(e);
        }}
        className="scale-150"
      />
      <Link to={ROUTER_PATHS.TODO_DETAIL(id)} className="flex grow flex-col">
        <Typography
          variant="largeText"
          className={cn(isChecked && 'text-gray-700 line-through')}
        >
          {title}
        </Typography>
        <Typography variant="mutedText">
          작성: {formatKoreanDate(createdAt)}
        </Typography>
        <Typography variant="mutedText">
          수정: {formatKoreanDate(updatedAt)}
        </Typography>
      </Link>
      <section className="flex items-center gap-4">
        <IconButton onClick={handleDelete}>
          <TrashIcon className="h-6 w-6" />
        </IconButton>
      </section>
    </article>
  );
};

export default Todo;
