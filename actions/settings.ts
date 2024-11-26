"use server";

import * as z from "zod";
import { SettingsNameSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import {  getUserById } from "@/data/user";
import db from "@/lib/db";

export const settings = async(
    values: z.infer<typeof SettingsNameSchema>
)=>{
    const user = await currentUser();

    if(!user) {
        return {error:"Unauthorized"}
    }

    const dbUser= await getUserById(user.id ?? "");
    if (!dbUser){
        return {error:"UNauthorized"}
    }

    await db.user.update({
        where: {id: dbUser.id},
        data:{
            ...values,
        }
    });
    return {success: "Settings Updated"}

}