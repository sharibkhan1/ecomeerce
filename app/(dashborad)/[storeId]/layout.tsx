import db from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import NavBar from "@/components/navbar";

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
    const user = session?.user;

    // Redirect to login if no authenticated user is found
    if (!user) {
        redirect("/auth/login");
    }

    // Check if the store exists and matches the given storeId
    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
        },
    });

    // Redirect to home page if store doesn't exist
    if (!store) {
        redirect("/mainAdmin/");
    }

    return <ProtectedLayout session={session}>{children}</ProtectedLayout>;
}
