import NewPasswordForm from '@/components/auth/new-password-form'
import React, { Suspense } from 'react';

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex-1 py-36 md:px-16 w-full">
    <div className="flex flex-col h-full gap-3">
  <NewPasswordForm/>
  </div>
  </div>
  </Suspense>
  )
}

export default NewPasswordPage