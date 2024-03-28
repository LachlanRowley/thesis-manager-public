import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'

// GET /api/projects/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    
  const sqlQObj = {
    where: filter(prisma.project.fields, req.query)
  };
  
  const result = await prisma.project.findMany({
    include: {
      disciplines: true,
      supervisor: true,
      co_supervisors: true,
      lab_access: true,
      second_marker: true
    },
    ...sqlQObj,
  });
  return res.status(201).json(result);
}