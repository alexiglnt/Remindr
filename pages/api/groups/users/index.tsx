import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function GroupsUser(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        const groupsUser = await prisma.groupeusers.findMany();
        console.log("groups : ", groupsUser);
        res.status(200).json({ groupsUser });
    }
    else if (req.method === 'POST') {
            
            const { IdG, IdU } = req.body;
    
            const groupUser = await prisma.groupeusers.create({
                data: {
                    IdG,
                    IdU,
                }
            });
    
            res.status(200).json({ groupUser });
    }
}
