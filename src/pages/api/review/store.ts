import type { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/core/prismaClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const {
                Email,
                Name,
                Profession,
                Rating,
                Review,
                Picture,
                Order,
            } = req.body;

            // Check if email already exists
            const existingReview = await db.review.findFirst({
                where: {
                    Email: Email
                }
            });

            if (existingReview) {
                return res.status(404).json({ error: 'Email is already present' });
            }

            // Create a new review in the database
            const newReview = await db.review.create({
                data: {
                    Email,
                    Name,
                    Profession,
                    Rating,
                    Review,
                    Picture,
                    Order,
                },
            });

            // Respond with the created review data
            res.status(200).json(newReview);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error storing review' });
        }
    } else {
        // Handle any other HTTP method
        res.status(405).json({ error: 'Method Not Allowed' });
    }

}