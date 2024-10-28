import RegisterForm from '@/components/auth/register-form';
import React, { Suspense } from 'react';

const Register = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex-1 py-36 md:px-16 w-full">
        <div className="flex flex-col h-full gap-3">
          <RegisterForm />
        </div>
      </div>
    </Suspense>
  );
}

export default Register;
