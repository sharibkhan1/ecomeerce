import { auth } from "@/auth";
import { Navbar } from "./_components/navbar";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const ProtectedLayout = ({ session, children }: { session: any, children: ReactNode }) => {
  return (
    <SessionProvider session={session}>
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-400">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth(); // Fetch session on the server side
  return <ProtectedLayout session={session}>{children}</ProtectedLayout>;
}
