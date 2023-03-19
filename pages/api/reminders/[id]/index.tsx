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
    else if (req.method === 'PUT') {
        const { title, description, dateRendu, couleur, groupId } = req.body;

        const reminder = await prisma.reminder.update({
            where: {
                id: parseInt(id as string),
            },
            data: {
                title,
                description,
                dateRendu: new Date(dateRendu),
                couleur: parseInt(couleur), // Convertir en entier
                groupId: parseInt(groupId) // Convertir en entier
            }
        });
        res.status(200).json({ reminder });
    }
}
