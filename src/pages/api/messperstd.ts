// pages/api/messperstd.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from "@/core/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session || !session.Student?.Email) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Fetch all data related to the student's email
        const messperstdData = await db.messperstd.findMany({
            where: { studentEmail: session.Student.Email },
            include: { Student: true }, // Include full related student data
        });

        return res.status(200).json(messperstdData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
