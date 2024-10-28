import ResetForm from '@/components/auth/reset-form'
import React from 'react'

const ResetPage = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
    <div className="flex flex-col h-full gap-3">
  <ResetForm/>
  </div>
  </div>
  )
}

export default ResetPage