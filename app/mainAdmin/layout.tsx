import db from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import { ModalProvider } from "@/provider/modal-provider";

const ProtectedLayout = ({ session, children }: { session: Session | null; children: ReactNode }) => (
    <SessionProvider session={session}>

        {children}</SessionProvider>
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

    // Find the store associated with the user
    const store = await db.store.findFirst({
        where: {
            userId,
        },
    });

    // If a store exists, redirect to the store's page
    if (store) {
        redirect(`/${store.id}`);
    }

    return <ProtectedLayout session={session}>
                <ModalProvider/>
        {children}</ProtectedLayout>;
}
