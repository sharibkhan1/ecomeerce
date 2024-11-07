import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { Urbanist } from "next/font/google";
import Footer from "@/components/footer";
import StoreNavBar from "@/components/storenavbar";
import SModalProvider from "@/provider/store-modal-provider";

const font = Urbanist({subsets:['latin']})

const ProtectedLayout = ({ session, children }: { session: Session | null; children: ReactNode }) => (
    <SessionProvider session={session}>
    <div className={font.className} >
        <SModalProvider/>
    <StoreNavBar/>
        {children}
        <Footer/>
        </div>  
        </SessionProvider>
);

export default async function Layout({ children }: { children: ReactNode }) {
    // Fetch session on the server side
    const session: Session | null = await auth();

    // Get the current user's ID from the session
    const userId = session?.user?.id;

    // If there is no authenticated user, redirect to the login page
    if (!userId) {
        redirect("/auth/login");
    }

    return <ProtectedLayout session={session}>      

        {children}
        
        </ProtectedLayout>;
}
