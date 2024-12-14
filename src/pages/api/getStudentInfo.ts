// pages/api/getStudentInfo.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/core/prismaClient';

interface StudentInfo {
    Name: string;
    Email: string;
    WAContact: string;
    ParentsContact: number;
    Address: string;
    City: string;
    Father: string;
    Mother: string;
    EmergencyContact: string;
    LocalName: string;
    LocalContact: number;
    Image: string | null;
    RollNumber: number;
    Branch: string;
    Year: number;
}

// API handler to get student info
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing email parameter' });
    }

    try {
        const studentInfo = await db.student.findUnique({
            where: { Email: email },
            select: {
                Name: true,
                Email: true,
                WAContact: true,
                ParentsContact: true,
                Address: true,
                City: true,
                Father: true,
                Mother: true,
                EmergencyContact: true,
                LocalName: true,
                LocalContact: true,
                RollNumber: true,
                Branch: true,
                Year: true,
            },
        });

        if (!studentInfo) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json(studentInfo);
    } catch (error) {
        console.error('Error fetching student info:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
