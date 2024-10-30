import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Typography } from '@/components/ui/typography';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo as TodoModel } from '@/api/dtos/todos';
import { formatKoreanDate } from '@/utils/format-korean-date';

interface TodoProps extends TodoModel {}

const Todo = ({ id, title, content, createdAt, updatedAt }: TodoProps) => {
  return (
    <article className="flex items-center gap-4 rounded-sm bg-white px-4 py-2">
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
        <div className="cursor-pointer rounded-md bg-slate-200 p-1 text-black transition-all hover:bg-slate-300 hover:text-gray-600">
          <TrashIcon className="h-6 w-6" />
        </div>
        <div className="cursor-pointer rounded-md bg-slate-200 p-1 text-black transition-all hover:bg-slate-300 hover:text-gray-600">
          <Pencil1Icon className="h-6 w-6" />
        </div>
      </section>
    </article>
  );
};

export default Todo;
