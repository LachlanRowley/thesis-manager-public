import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

//DEPRECATED
// GET /api/supervisors/updateSupervisor

//call this method with a PUT with a body matching the req.body
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    //Change this to fit the submitted form
    const {academic_id, ...data} = req.body;

    try {
        const updateSupervisor = await prisma.supervisor.update({
            where: {academic_id},
            data: {
                ...data
            },
        });
        res.status(201).json(updateSupervisor)
    } catch (error) {
        res.status(500).json({error: "error creating supervisor"});
    }
}
