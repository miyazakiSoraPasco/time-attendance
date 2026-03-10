import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { useAuthStore } from '@/features/auth';
import { Card } from "@/shared/components/Card";
import { Container } from "@/shared/components/Container";
import { Typography } from "@/shared/components/Typography";

// 既にログイン時にリダイレクトします。
const useRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);
};

export default function LoginPage() {
  useRedirect();

  return (
    <Container center className="bg-linear-to-br from-blue-600 to-blue-800 p-4">
      <Card size="lg" className="w-full max-w-md">
        <Typography asChild variant="h1" className="mb-4">
          <h1>勤怠管理システム</h1>
        </Typography>
        <LoginForm />
      </Card>
    </Container>
  );
}