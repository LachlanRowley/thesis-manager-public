import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'


// GET /api/supervisor/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const sqlQObj = {
        where: filter(prisma.academic.fields, req.query)
      };
      
      const result = await prisma.academic.findMany({
        include: {
            user: {
                select: {
                    firstname: true,
                    lastname: true
                }
            }
        },
        ...sqlQObj,
      });
      return res.status(201).json(result);
  return res.status(201).json(result);
}