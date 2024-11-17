// lib/authUtils.js
"use server";

import { currentUserId } from "./auth";


export const getUserIdInfor = async () => {
  const userId = await currentUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return userId;
};

export const getUserIdItemCount  = async () => {
    const userId = await currentUserId();
    if (!userId) return 0;
    return userId;
  };
  

  export const getUserIdItem  = async () => {
    const userId = await currentUserId();
    if (!userId) return [];
    return userId;
  };