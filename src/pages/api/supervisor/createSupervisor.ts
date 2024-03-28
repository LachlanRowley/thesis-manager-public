import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/supervisors/createSupervisor

//call this method with a POST with a body matching schema
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    try {
        const newSupervisor = await prisma.supervisor.create({
            data: {
                ...req.body
            },
        });
        res.status(201).json(newSupervisor)
    } catch (error) {
        res.status(500).json({error: "error creating supervisor"});
    }
}