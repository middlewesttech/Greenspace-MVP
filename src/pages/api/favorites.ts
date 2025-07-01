import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userEmail = session.user.email;
  const client = await clientPromise;
  const db = client.db();
  const favorites = db.collection("favorites");

  if (req.method === "GET") {
    // List user's favorites
    const userFavorites = await favorites.find({ userEmail }).toArray();
    return res.status(200).json(userFavorites);
  }

  if (req.method === "POST") {
    // Add a new favorite
    const { strainId, strainName, consumptionType, dispensary } = req.body;
    if (!strainId || !strainName) {
      return res.status(400).json({ message: "strainId and strainName required" });
    }
    const result = await favorites.insertOne({ 
      userEmail, 
      strainId, 
      strainName, 
      consumptionType: consumptionType || null,
      dispensary: dispensary || null
    });
    return res.status(201).json(result);
  }

  if (req.method === "DELETE") {
    // Remove a favorite by _id
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "id required" });
    const result = await favorites.deleteOne({ _id: new ObjectId(id as string), userEmail });
    return res.status(200).json(result);
  }

  if (req.method === "PUT") {
    // Update a favorite by _id
    const { id, strainId, strainName, consumptionType, dispensary } = req.body;
    if (!id || !strainId || !strainName) {
      return res.status(400).json({ message: "id, strainId, and strainName required" });
    }
    const result = await favorites.updateOne(
      { _id: new ObjectId(id), userEmail },
      { $set: { 
        strainId, 
        strainName, 
        consumptionType: consumptionType || null,
        dispensary: dispensary || null
      } }
    );
    return res.status(200).json(result);
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 