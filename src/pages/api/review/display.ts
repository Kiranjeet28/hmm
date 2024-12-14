import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/core/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Fetch reviews ordered by Order (ascending) and then by createdAt if Order is null
        const reviews = await db.review.findMany({
            orderBy: [
                { Order: 'asc' },
                { createdAt: 'asc' },
            ],
        });

        return res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
