import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function GroupID(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const group = await prisma.group.findUnique({
            where: {
                id: parseInt(id as string),
            },
        });
        res.status(200).json({ group });
    }
    else if (req.method === 'PUT') {

        const { name, description, image, id } = req.body;

        const group = await prisma.group.update({
            where: {
                id: parseInt(id as string),
            },
            data: {
                name,
                description,
                image,
            },
        });

        res.status(200).json({ group });
    }
}
