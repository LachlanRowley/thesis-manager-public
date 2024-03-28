import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'

// GET /api/students/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sqlQObj = {
    where: filter(prisma.student.fields, req.query)
  };
  
  const result = await prisma.student.findMany({...sqlQObj});

  return res.status(201).json(result);
}