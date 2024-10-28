import Todo from '@/components/common/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { useAuthContext } from '@/providers/auth-provider';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate(ROUTER_PATHS.SIGNIN);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <section className="w-full max-w-screen-xl p-4">
        <nav className="flex justify-between">
          <Typography variant="h1">Todo List</Typography>
          <Button onClick={handleLogout}>로그아웃</Button>
        </nav>
        <div className="mt-8 flex">
          <aside className="flex h-[80svh] w-full max-w-md flex-col gap-4 overflow-y-auto rounded-md bg-gray-100 p-4">
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
          </aside>
          <section className="flex grow flex-col gap-4 p-4">
            <div className="flex gap-4">
              <Label
                htmlFor="title"
                className="flex w-12 items-center justify-center"
              >
                <Typography variant="largeText">제목</Typography>
              </Label>
              <Input id="title" placeholder="할 일의 제목을 입력해주세요" />
            </div>
            <Textarea placeholder="내용을 입력해주세요." rows={15} />
            <div className="flex justify-end">
              <Button>추가</Button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default TodoPage;
