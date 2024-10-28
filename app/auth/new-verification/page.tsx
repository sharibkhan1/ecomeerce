import NewVerificationForm from "@/components/auth/new-verification-form";

const NewVerificationPage=()=>{
    return(
        <div className="flex-1 py-36 md:px-16 w-full">
        <div className="flex flex-col h-full gap-3">
            <NewVerificationForm/>
      </div>
      </div>
    );
}

export default NewVerificationPage;