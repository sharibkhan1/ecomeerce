// app/api/user-details/route.ts
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        name: true,
        phoneno: true,
        address: true,
      },
    });

    if (!dbUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(dbUser), { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

