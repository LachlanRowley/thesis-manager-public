import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Fuse from 'fuse.js';

// GET /api/labs/search?q=<search_terms>
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const resultRaw = await prisma.lab.findMany();
  const fuse = new Fuse(resultRaw, { keys: ['address', 'name', 'description'] });
  return res.status(201).json(fuse.search(req.query.q?.toString() || ''));
}