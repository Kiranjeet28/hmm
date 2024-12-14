import { db } from "@/core/prismaClient";
import { $Enums } from "@prisma/client";
export default async function createUserIfNot({
    Email,
    Name,
    Image,
}: {
    Email: string;
    Name: string;
    Image?: string | null;
}) {
    try {
        // Check if the user already exists
        const dbUser = await db.student.findUnique({ where: { Email } });
        if (dbUser) return dbUser;

        // Get the current year
        const currentYear = new Date().getFullYear();

      

        // Create the new student with default values for missing fields
        const user = await db.student.create({
            data: {
                Name,
                Email,
                Image,
                role: $Enums.Role.USER,
                
                Messperstd: {
                    create: {
                        Year: currentYear,
                        january: false,
                        february: false,
                        march: false,
                        april: false,
                        may: false,
                        june: false,
                        july: false,
                        august: false,
                        september: false,
                        october: false,
                        november: false,
                        december: false,
                    },
                },
            },
        });

        return user;
    } catch (error: any) {
        if (error.code === 'P2002') {
            console.error("Unique constraint violation on a field:", error.meta?.target);
        } else {
            console.error("An unexpected error occurred:", error);
        }
        return null;
    }
}