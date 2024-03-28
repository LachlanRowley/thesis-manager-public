import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/users/update

//call this method with a PUT with a body matching the req.body
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    //Change this to fit the submitted form
    const {id, ...data} = req.body;

    try {
        const updateUser = await prisma.user.update({
            where: {id},
            data: {
                ...data
            },
        });
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(500).json({error: "error creating user"});
    }
}
