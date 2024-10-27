import { UsersService } from '@/api/services/users';
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
import { useToast } from '@/hooks/use-toast';
import { signUpSchema } from '@/schemas/sign-schema';
import { getApiErrorMessage } from '@/utils/get-api-error';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const SignUpPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit: handleFormSubmit,
    trigger,
    formState: { errors, isValid },
    getFieldState,
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
  });

  const mutation = useMutation({
    mutationFn: UsersService.signUp,
  });

  const handleSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = (data) => {
    mutation.mutate(
      {
        data,
      },
      {
        onSuccess: (res) => {
          toast({
            title: '회원가입 성공',
            description: res.message,
          });
          navigate(ROUTER_PATHS.SIGNIN);
        },
        onError: async (error) => {
          const errorMessage = await getApiErrorMessage(error);

          toast({
            variant: 'destructive',
            title: '회원가입 실패',
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
              <Typography variant="h3" as="p">
                회원가입
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
                {...register('password', {
                  onChange: () => {
                    if (getFieldState('passwordConfirm').isDirty) {
                      trigger('passwordConfirm');
                    }
                  },
                })}
              />
              <Typography className="ms-2" variant="error">
                {errors.password?.message}
              </Typography>
            </section>
            <div className="h-4" />
            <section className="flex flex-col gap-2">
              <Label htmlFor="password-confirm">비밀번호 재확인</Label>
              <Input
                id="password-confirm"
                placeholder="비밀번호 재확인을 입력해주세요."
                type="password"
                {...register('passwordConfirm')}
              />
              <Typography className="ms-2" variant="error">
                {errors.passwordConfirm?.message}
              </Typography>
            </section>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button disabled={!isValid} className="w-full">
              회원가입
            </Button>
            <div className="h-4" />
            <Typography variant="mutedText" className="center" asChild>
              <Link to={ROUTER_PATHS.SIGNIN}>로그인 하러 가기</Link>
            </Typography>
          </CardFooter>
        </Card>
        <DevTool control={control} />
      </main>
    </form>
  );
};

export default SignUpPage;
