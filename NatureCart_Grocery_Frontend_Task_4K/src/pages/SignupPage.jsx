import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

export function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up and start shopping"
    >
      <SignupForm />
    </AuthLayout>
  );
}

export default SignupPage;
