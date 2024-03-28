import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

//DEPRECATED DO NOT USE
// GET /api/users/createUser

//call this method with a POST with a body matching schema
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    try {
        const newUser = await prisma.user.create({
            data: {
                ...req.body
            },
        });
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({error: "error creating user"});
    }
}