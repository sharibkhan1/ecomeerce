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

export const getUserDetails = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized"); // No user found
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id, // Get the current user by ID
      },
      select: {
        phoneno: true,
        address: true,
      },
    });

    if (!dbUser) {
      throw new Error("User not found");
    }

    return dbUser;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return { phoneno: "+91", address: "" }; // Default values if user not found
  }
};


export const getUserByAddress = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized"); // No user found
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id, // Get the current user by ID
      },select: {
        address: true, // Only fetch the address
      },
    });
    if (!dbUser || !dbUser.address) {
      throw new Error("User address not found");
    }

    return dbUser.address; // Return only the address

  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
