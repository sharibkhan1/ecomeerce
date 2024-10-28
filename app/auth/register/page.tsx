import LoginForm from '@/components/auth/login-form'
import RegisterForm from '@/components/auth/register-form'
import React from 'react'

const Register = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
    <div className="flex flex-col h-full gap-3">
  <RegisterForm/>
  </div>
  </div>
  )
}

export default Register