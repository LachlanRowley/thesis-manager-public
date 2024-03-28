import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
//DEPRECATED
// GET /api/supervisors/getSupervisor
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.academic.findMany();
  return res.status(201).json(result);
}