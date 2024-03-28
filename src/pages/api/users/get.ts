import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import filter from '../../../backendUtils/filter'
import { PrismaClient } from '@prisma/client'

// GET /api/users/get
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sqlQObj = {
    where: filter(prisma.user.fields, req.query)
  };
  
  // let db_params = filter(prisma.user, reqsqlQObj;
  const result = await prisma.user.findMany({...sqlQObj});
  return res.status(201).json(result);
}