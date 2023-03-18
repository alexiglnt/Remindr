import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function Reminders(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const reminders = await prisma.reminder.findMany();
        res.json({ reminders });
    }
    else if (req.method === 'POST') {
        const { title, description, dateRendu, couleur, groupId } = req.body;

        const reminder = await prisma.reminder.create({
            data: {
                title,
                description,
                dateRendu: new Date(dateRendu),
                couleur: parseInt(couleur), // Convertir en entier
                groupId: parseInt(groupId) // Convertir en entier
            }
        });

        res.json({ reminder });
    }

}
