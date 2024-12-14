// pages/api/updateStudent.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/core/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const data = req.body; // Expecting the data to be sent as JSON

    // Validate incoming data if necessary
    if (!data || !data.Email) {
        return res.status(400).json({ message: "Invalid data" });
    }

    try {
        // Update student details
        const updatedStudent = await db.student.update({
            where: { Email: data.Email }, // Assuming you're updating by email
            data: {
                RollNumber: data.RollNumber,
                Branch: data.Branch,
                Year: data.Year,
                WAContact: data.WAContact,
                ParentsContact: data.ParentsContact,
                Address: data.Address,
                City: data.City,
                Father: data.Father,
                Mother: data.Mother,
                EmergencyContact: data.EmergencyContact,
                LocalName: data.LocalName,
                LocalContact: data.LocalContact,
            },
        });

        return res.status(200).json({ message: "Student details updated successfully", student: updatedStudent });
    } catch (error) {
        console.error("Error updating student details:", error);
        return res.status(500).json({ message: "Failed to update student details" });
    }
}
