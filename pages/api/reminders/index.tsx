import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function Reminders(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        getAllReminders(res);
    }
    else if (req.method === 'POST') {
        createReminder(req, res);
    }
}


// *********************************************************** FUNCTIONS ***********************************************************


// GET
async function getAllReminders(res: NextApiResponse) {
    const reminders = await prisma.reminder.findMany();
    res.status(200).json({ reminders });
}

// POST
async function createReminder(req: NextApiRequest, res: NextApiResponse) {
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

    res.status(200).json({ reminder });
}
