import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Fuse from 'fuse.js';

// GET /api/users/search?q=<search_terms>
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resultRaw = await prisma.user.findMany();
  const fuse = new Fuse(resultRaw, { keys: ['firstname', 'lastname', 'email'] });
  return res.status(201).json(fuse.search(req.query.q?.toString() || ''));
}