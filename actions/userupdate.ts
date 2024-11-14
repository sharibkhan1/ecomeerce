"use server"
import { currentUser } from "@/lib/auth";  // Assuming this retrieves the current user
import db from "@/lib/db";

export const updateUserDetails = async (mobileNo: string, address: string) => {
  try {
    const user = await currentUser();
    
    if (!user) {
      throw new Error("Unauthorized"); // No user found
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id, // Get the current user by ID
      },
    });

    if (!dbUser) {
      throw new Error("User not found");
    }

    // Update user details in the database
    await db.user.update({
      where: {
        id: dbUser.id, // Use user ID to update specific user
      },
      data: {
        phoneno: mobileNo, // Update phone number
        address: address,  // Update address
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: error };
  }
};

