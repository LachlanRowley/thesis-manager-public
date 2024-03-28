import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Fuse from 'fuse.js';

// GET /api/academics/search?q=<search_terms>
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resultRaw = await prisma.academic.findMany({"include": {"user": true}});
  const fuse = new Fuse(resultRaw, { keys: ['user.firstname', 'user.lastname', 'user.email', 'discipline'] });
  return res.status(201).json(fuse.search(req.query.q?.toString() || ''));
}