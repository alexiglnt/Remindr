import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function GroupsUser(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        getAllGroupsUser(res);
    }
    else if (req.method === 'POST') {
        createGroupUser(req, res);
    }
    else if (req.method === 'DELETE') {
        deleteGroupUser(req, res);
    }
}


// *********************************************************** FUNCTIONS ***********************************************************


// GET
async function getAllGroupsUser(res: NextApiResponse) {
    const groupsUser = await prisma.groupeusers.findMany();
    console.log("groups : ", groupsUser);
    res.status(200).json({ groupsUser });
}

// POST
async function createGroupUser(req: NextApiRequest, res: NextApiResponse) {
    const { IdG, IdU } = req.body;

    const groupUser = await prisma.groupeusers.create({
        data: {
            IdG,
            IdU,
        }
    });

    res.status(200).json({ groupUser });
}

// DELETE
async function deleteGroupUser(req: NextApiRequest, res: NextApiResponse) {
    const { IdG, IdU } = req.body;

    const groupUser = await prisma.groupeusers.delete({
        where: {
            IdG_IdU: {
                IdG,
                IdU
            }
        }
    });

    res.status(200).json({ groupUser });
}
