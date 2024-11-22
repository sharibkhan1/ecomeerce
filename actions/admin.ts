"use server"

import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client";

export const mainAdmin = async()=>{
    const role = await currentRole();

    if(role === UserRole.MAINADMIN){
        return {success: "Allowed"};
    }
    return {error: "Forbidden!"}
}

export const admin = async()=>{
    const role = await currentRole();

    if(role === UserRole.ADMIN){
        return {success: "Allowed"};
    }
    return {error: "Forbidden!"}
}