import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function Groups(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const groups = await prisma.group.findMany();
        console.log("groups : ", groups);
        res.status(200).json({ groups });
    }
    else if (req.method === 'POST') {

        const { name, description, image } = req.body;

        const group = await prisma.group.create({
            data: {
                name,
                description,
                image,
            }
        });

        res.status(200).json({ group });
    }
}
