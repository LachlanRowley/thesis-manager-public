import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'

// GET /api/labs/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sqlQObj = {
    where: filter(prisma.lab.fields, req.query)
  };
  
  // let db_params = filter(prisma.lab, reqsqlQObj;
  const result = await prisma.lab.findMany({...sqlQObj});
  return res.status(201).json(result);
}