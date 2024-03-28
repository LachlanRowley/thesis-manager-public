import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'

// GET /api/disciplines/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sqlQObj = {
    where: filter(prisma.discipline.fields, req.query)
  };
  
  // let db_params = filter(prisma.discipline, reqsqlQObj;
  const result = await prisma.discipline.findMany({...sqlQObj});
  return res.status(201).json(result);
}