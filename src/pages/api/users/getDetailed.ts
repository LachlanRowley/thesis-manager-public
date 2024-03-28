import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/users/getDetailed?email=EMAIL
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {email} = req.query;
    const result = await prisma.user.findFirst({
        where: {
            email: email
        },
        include: {
            student: true,
            academic: true,
        }
    });
    return res.status(201).json(result);
}