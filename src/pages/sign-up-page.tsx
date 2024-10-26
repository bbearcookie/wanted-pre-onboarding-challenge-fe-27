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

const SignUpPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="h-fit w-full max-w-96">
        <CardHeader>
          <CardTitle>
            <Typography variant="h3" as="h3">
              회원가입
            </Typography>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-2">
            <Label>이메일</Label>
            <Input placeholder="이메일을 입력해주세요." />
          </section>
          <div className="h-4" />
          <section className="flex flex-col gap-2">
            <Label>비밀번호</Label>
            <Input placeholder="비밀번호를 입력해주세요." />
          </section>
          <div className="h-4" />
          <section className="flex flex-col gap-2">
            <Label>비밀번호 재확인</Label>
            <Input placeholder="비밀번호 재확인을 입력해주세요." />
          </section>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full">회원가입</Button>
          <div className="h-4" />
          <Typography variant="mutedText" className="center" asChild>
            <Link to={ROUTER_PATHS.SIGNIN}>로그인 하러 가기</Link>
          </Typography>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignUpPage;
