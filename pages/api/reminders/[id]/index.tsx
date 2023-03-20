import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function ReminderID(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        getThisReminder(res, req);
    }
    else if (req.method === 'PUT') {
        updateThisReminder(req, res);
    }
    else if (req.method === 'DELETE') {
        deleteThisReminder(req, res);
    }
}


// *********************************************************** FUNCTIONS ***********************************************************


// GET
async function getThisReminder(res: NextApiResponse, req: NextApiRequest) {
    const { id } = req.query;

    const reminder = await prisma.reminder.findUnique({
        where: {
            id: parseInt(id as string),
        },
    });
    res.status(200).json({ reminder });
}

// PUT
async function updateThisReminder(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, dateRendu, couleur, groupId, id } = req.body;

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

// DELETE
async function deleteThisReminder(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    const reminder = await prisma.reminder.delete({
        where: {
            id: parseInt(id)
        }
    });

    res.json({ reminder });
}

