import { NextApiRequest, NextApiResponse } from 'next';


export default async function GroupsUser(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        console.log("Requête reçue, corps :", req.body);
        const { test } = req.body;
        console.log("test :", test);

        const result = test * 2;
        console.log("result :", result);

        res.status(200).json({ result });
    }
}


// *********************************************************** FUNCTIONS ***********************************************************


// // GET
// async function getAllGroupsUser(res: NextApiResponse) {
//     const groupsUser = await prisma.groupeusers.findMany();
//     console.log("groups : ", groupsUser);
//     res.status(200).json({ groupsUser });
// }

// // POST
// async function createGroupUser(req: NextApiRequest, res: NextApiResponse) {
//     const { IdG, IdU } = req.body;

//     const groupUser = await prisma.groupeusers.create({
//         data: {
//             IdG,
//             IdU,
//         }
//     });

//     res.status(200).json({ groupUser });
// }

// // DELETE
// async function deleteGroupUser(req: NextApiRequest, res: NextApiResponse) {
//     const { IdG, IdU } = req.body;

//     const groupUser = await prisma.groupeusers.delete({
//         where: {
//             IdG_IdU: {
//                 IdG,
//                 IdU
//             }
//         }
//     });

//     res.status(200).json({ groupUser });
// }
