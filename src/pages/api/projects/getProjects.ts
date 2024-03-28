import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

//DEPRECATED
// GET /api/projects/getProjects
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.project.findMany();
  return res.status(201).json(result);
}