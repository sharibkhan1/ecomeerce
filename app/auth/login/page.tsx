import LoginForm from '@/components/auth/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
    <LoginForm/>
    </div>
    </div>
  )
}

export default LoginPage