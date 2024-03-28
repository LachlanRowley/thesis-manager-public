import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/students/getStudents
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await prisma.student.findMany();
  return res.status(201).json(result);
}