import type { NextApiRequest, NextApiResponse } from "next";

interface PlaceResult {
  name: string;
  types?: string[];
  [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { query } = req.query;
  
  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Query parameter required" });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "Google Places API key not configured" });
    }

    // Search for dispensaries using Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query + " dispensary"
      )}&type=establishment&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    // Filter results to focus on dispensaries and cannabis-related businesses
    const filteredResults = data.results?.filter((place: PlaceResult) => {
      const name = place.name.toLowerCase();
      const types = place.types || [];
      
      return (
        name.includes("dispensary") ||
        name.includes("cannabis") ||
        name.includes("marijuana") ||
        name.includes("weed") ||
        name.includes("pot") ||
        types.some((type: string) => 
          type.includes("store") || 
          type.includes("establishment")
        )
      );
    }) || [];

    return res.status(200).json({
      results: filteredResults.slice(0, 10), // Limit to 10 results
      status: data.status
    });
  } catch (error) {
    console.error("Places API error:", error);
    return res.status(500).json({ 
      message: "Error searching for dispensaries",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
} 