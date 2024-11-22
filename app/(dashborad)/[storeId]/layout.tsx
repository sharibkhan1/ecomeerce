import db from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import NavBar from "@/components/navbar";
import { currentUserId } from "@/lib/auth";

const ProtectedLayout = ({ session, children }: { session: Session | null; children: ReactNode }) => (
    <SessionProvider session={session}>
        <NavBar/>
        {children}
    </SessionProvider>
);

export default async function Layout({
    children,
    params,
}: {
    children: ReactNode;
    params: { storeId: string };
}) {
    // Fetch session and user authentication on the server side
    const session: Session | null = await auth();
    const userId =await currentUserId()

    // Redirect to login if no authenticated user is found
    if (!userId) {
        redirect("/auth/login");
    }

    // Check if the store exists and matches the given storeId
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        include:{stores:true}
    });

    if(!user || user.stores.length ===0){
        redirect("/");
    }
const  stor = process.env.STORE_ID;
if (!stor) {
    redirect("/error"); // You can customize this to render a 404 page
}
    // Redirect to home page if store doesn't exist
    // if (!store) {
    //     redirect("/");
    // }

    return <ProtectedLayout session={session}>{children}</ProtectedLayout>;
}
