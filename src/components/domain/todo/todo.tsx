import { Pencil1Icon } from '@radix-ui/react-icons';
import { Typography } from '@/components/ui/typography';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo as TodoModel } from '@/api/dtos/todos';
import { formatKoreanDate } from '@/utils/format-korean-date';
import { Link, useMatch } from 'react-router-dom';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/utils/shadcn';

interface TodoProps extends TodoModel {}

const Todo = ({ id, title, content, createdAt, updatedAt }: TodoProps) => {
  const isCurrentTodo = useMatch(ROUTER_PATHS.TODO_DETAIL(id));

  return (
    <article
      className={cn(
        'flex items-center gap-4 rounded-sm border-2 border-transparent bg-white px-4 py-2',
        isCurrentTodo && 'border-primary',
      )}
    >
      <Checkbox className="scale-150" />
      <section className="flex grow flex-col">
        <Typography variant="largeText">{title}</Typography>
        <Typography variant="mutedText">
          작성: {formatKoreanDate(createdAt)}
        </Typography>
        <Typography variant="mutedText">
          수정: {formatKoreanDate(updatedAt)}
        </Typography>
      </section>
      <section className="flex items-center gap-4">
        <IconButton>
          <Link to={ROUTER_PATHS.TODO_DETAIL(id)}>
            <Pencil1Icon className="h-6 w-6" />
          </Link>
        </IconButton>
      </section>
    </article>
  );
};

export default Todo;
