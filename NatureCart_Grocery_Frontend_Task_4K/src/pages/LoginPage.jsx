import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Login to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
