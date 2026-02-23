import { useEffect } from 'react';
import { useNavigate, useLocation, type Location } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider } from '@/shared/components/form/FormProvider';
import { useAuth, loginFormSchema } from '@/features/auth';
import { getCsrfTokenApi } from '@/features/auth/api/api';
import type { LoginFormData } from '@/features/auth';
import { Button, Input } from '@/shared/components';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useAuth().login;

  // ログイン後のリダイレクト
  useEffect(() => {
    if (loginMutation.isSuccess) {
      const from = (location.state as { from: Location })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [loginMutation.isSuccess, navigate, location]);

  const onSubmit = async (data: LoginFormData) => {
    // CSRF トークン取得
    await getCsrfTokenApi();

    // ログイン
    await loginMutation.mutateAsync(data);
  };

  return (
    <FormProvider<LoginFormData>
      formOptions={{ resolver: zodResolver(loginFormSchema) }}
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <Input label="メールアドレス" name="email" type="email" placeholder='test@test.com' />
      <Input label="パスワード" name="password" type="password" />

      <Button type="submit">ログイン</Button>
      <Button variant="secondary">キャンセル</Button>
      <Button variant="danger">削除</Button>
      <Button variant="outline">下書き保存</Button>
      <Button variant="ghost">閉じる</Button>
      <Button variant="link">詳細を見る</Button>

      <Button size="sm">小さい</Button>
      <Button size="lg">大きい</Button>
    </FormProvider>
  );
}
