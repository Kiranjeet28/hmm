// pages/api/messperstdWithDetails.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/core/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const messData = await db.student.findMany();

        return res.status(200).json(messData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching mess details', error });
    }
}
