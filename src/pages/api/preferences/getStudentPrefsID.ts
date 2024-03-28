import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/preferences/getStudentPrefsID?id=12345
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {id} = req.query;
  const result = await prisma.student.findUniqueOrThrow({
    where: {
      uni_id: id
    },
    select: {
      preferences: true
    }
  });

  for(const i in result["preferences"]) {
    result["preferences"][i] = result["preferences"][i].id;
    }

  return res.status(201).json(result["preferences"]);
}