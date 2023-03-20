import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function GroupID(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        getThisGroup(res, req);
    }
    else if (req.method === 'PUT') {
        updateThisGroup(req, res);
    }
}

// *********************************************************** FUNCTIONS ***********************************************************


// GET
async function getThisGroup(res: NextApiResponse, req: NextApiRequest) {
    const { id } = req.query;

    const group = await prisma.group.findUnique({
        where: {
            id: parseInt(id as string),
        },
    });
    res.status(200).json({ group });
}

// PUT
async function updateThisGroup(req: NextApiRequest, res: NextApiResponse) {
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

