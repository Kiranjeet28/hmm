import { db } from "@/core/prismaClient";

export default async function getUserInfo({ Email }: { Email: string }) {
    try {
        const info = await db.student.findUnique({
            where: { Email },
            select: { role : true, id: true },
        });
        return info;
    } catch (err) {
        console.log(err);
        return null;
    }
}
