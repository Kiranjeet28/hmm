// pages/api/messperstd.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/core/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Fetch all data related to the student's email
        const messperstdData = await db.messperstd.findMany({
            where: { studentEmail: email as string },
            include: { Student: true }, // Include full related student data
        });

        return res.status(200).json(messperstdData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}