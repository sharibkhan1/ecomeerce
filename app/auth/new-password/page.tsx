import NewPasswordForm from '@/components/auth/new-password-form'
import React from 'react'

const NewPasswordPage = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
    <div className="flex flex-col h-full gap-3">
  <NewPasswordForm/>
  </div>
  </div>
  )
}

export default NewPasswordPage