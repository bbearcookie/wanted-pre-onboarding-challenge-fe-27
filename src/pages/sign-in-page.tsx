import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/typography';
import { ROUTER_PATHS } from '@/constants/router-paths';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/schemas/sign-schema';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';
import { UsersService } from '@/api/services/users';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getApiErrorMessage } from '@/utils/get-api-error';

const SignInPage = () => {
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: 'all',
  });

  const mutation = useMutation({
    mutationFn: UsersService.login,
  });

  const handleSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (
    data,
  ) => {
    mutation.mutate(
      {
        data,
      },
      {
        onSuccess: (res) => {
          toast({
            title: '로그인 성공',
            description: res.message,
          });
        },
        onError: async (error) => {
          const errorMessage = await getApiErrorMessage(error);

          toast({
            variant: 'destructive',
            title: '로그인 실패',
            description: errorMessage,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card className="h-fit w-full max-w-96">
          <CardHeader>
            <CardTitle>
              <Typography variant="h3" as="h3">
                로그인
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <section className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                placeholder="이메일을 입력해주세요."
                {...register('email')}
              />
              <Typography className="ms-2" variant="error">
                {errors.email?.message}
              </Typography>
            </section>
            <div className="h-4" />
            <section className="flex flex-col gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                placeholder="비밀번호를 입력해주세요."
                type="password"
                {...register('password')}
              />
              <Typography className="ms-2" variant="error">
                {errors.password?.message}
              </Typography>
            </section>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button disabled={!isValid} className="w-full">
              로그인
            </Button>
            <div className="h-4" />
            <Typography variant="mutedText" className="center" asChild>
              <Link to={ROUTER_PATHS.SIGNUP}>아직 가입하지 않으셨나요?</Link>
            </Typography>
          </CardFooter>
        </Card>
        <DevTool control={control} />
      </main>
    </form>
  );
};

export default SignInPage;
