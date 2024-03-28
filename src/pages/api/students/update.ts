import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/students/update

//call this method with a PUT with a body matching the req.body
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    //Change this to fit the submitted form
    const {user_id, ...data} = req.body;

    try {
        const updateStudent = await prisma.student.update({
            where: {user_id},
            data: {
                ...data
            },
        });
        res.status(201).json(updateStudent)
    } catch (error) {
        res.status(500).json({error: "error creating student"});
    }
}
