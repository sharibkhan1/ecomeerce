import NewVerificationForm from "@/components/auth/new-verification-form";
import React, { Suspense } from 'react';

const NewVerificationPage=()=>{
    return(
        <Suspense fallback={<div>Loading...</div>}>
        <div className="flex-1 py-36 md:px-16 w-full">
        <div className="flex flex-col h-full gap-3">
            <NewVerificationForm/>
      </div>
      </div>
      </Suspense>
    );
}

export default NewVerificationPage;