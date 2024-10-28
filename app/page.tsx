import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HomeP {
  children : React.ReactNode;
}

export default function Home({children}:HomeP) {
  return (
<div className='h-screen flex w-full justify-center' >
        <div className='w-[600px] ld:w-full flex flex-col items-center p-6 ' >
            <Image
            src="/logo.png"
            alt="LOGO"
            sizes="100vw"
            style={{
                width:"20%",
                height:"auto",
            }}
            width={0}
            height={0}
            />
            <LoginButton mode="modal" asChild >

           <Button variant="secondary" >
            Sign In
           </Button>
            </LoginButton>
        </div>
        <div className='hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden
        relative bg-cream flex-col pt-10 pl-24 gap-3 ' >
            <h2 className='text-gravel md:text-4xl font-bold' >
                Hi, Test Auth, SEKIRO !!
            </h2>
            <p className="text-iridium md:text-sm mb-10">
          Corinna is capable of capturing lead information without a form...{' '}
          <br />
          something never done before 😉
        </p>
        <Image
            src="/app-ui.png"
            alt="iamge"
            loading='lazy'
            sizes="30"
            className='absolute shrink-0 !w-[1600px] top-48 '
            width={0}
            height={0}
        />  
        </div>
    </div>
  );
}
