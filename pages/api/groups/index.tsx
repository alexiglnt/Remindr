import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function Groups(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        getAllGroups(res);
    }
    else if (req.method === 'POST') {
        createGroup(req, res);
    }
}


// *********************************************************** FUNCTIONS ***********************************************************


// GET
async function getAllGroups(res: NextApiResponse) {
    const groups = await prisma.group.findMany();
    console.log("groups : ", groups);
    res.status(200).json({ groups });
}

// POST
async function createGroup(req: NextApiRequest, res: NextApiResponse) {
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
