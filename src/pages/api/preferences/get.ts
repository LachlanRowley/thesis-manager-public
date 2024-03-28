import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'

// GET /api/students/getStudents
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sqlQObj = {
    where: filter(prisma.preferences.fields, req.query)
  };
  
  // let db_params = filter(prisma.preferences, reqsqlQObj;
  const result = await prisma.preferences.findMany({...sqlQObj});
  return res.status(201).json(result);
}