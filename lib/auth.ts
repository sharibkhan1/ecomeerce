import { auth } from "@/auth";

export const currentUser = async()=>{
    const session = await auth();

    return session?.user;
}

export const currentUserId = async()=>{
    const session = await auth();

    return session?.user?.id;
}

export const currentRole = async()=>{
    const session = await auth();

    return session?.user?.role;
}

//azizur.213639101@vcet.edu.in
//##livefornothing##