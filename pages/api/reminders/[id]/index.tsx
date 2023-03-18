import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function ReminderID(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const reminder = await prisma.reminder.findUnique({
            where: {
                id: parseInt(id as string),
            },
        });
        res.status(200).json({ reminder });
    }
}
