import { getUserByAddress } from "@/actions/userupdate"; // Function to fetch current user address
const GOOGLE_MAPS_API_KEY = process.env.GOGGLE_MAP;
const DESTINATION_ADDRESS = "Holy Family Convent High School";

export async function POST() {
  try {
    // Fetch the current user's address
    const userAddress = await getUserByAddress();
    if (!userAddress) {
      return new Response(JSON.stringify({ error: "User address not found" }), { status: 404 });
    }

    // Construct the Google Maps Distance Matrix API URL
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      userAddress
    )}&destinations=${encodeURIComponent(DESTINATION_ADDRESS)}&key=${GOOGLE_MAPS_API_KEY}`;

    // Fetch data from Google Maps API
    const response = await fetch(url);

    const data = await response.json();
    if (data.status === "OK") {
      const travelTimeInSeconds = data.rows[0]?.elements[0]?.duration?.value;
      const travelDistanceInMeters = data.rows[0]?.elements[0]?.distance?.value;

      return new Response(
        JSON.stringify({
          travelTimeMinutes: travelTimeInSeconds ? travelTimeInSeconds / 60 : null,
          travelDistanceKm: travelDistanceInMeters ? travelDistanceInMeters / 1000 : null,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Error fetching distance from Google API", details: data.error_message }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in distance calculation API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
