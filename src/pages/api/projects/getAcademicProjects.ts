import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Fuse from 'fuse.js';

// GET /api/projects/getAcademicProjects?academic=id_string

export default async function handle(
	req: NextApiRequest,
	res: NextApiResonse,
)	{
	const {idString} = req.query;
	console.log("ID STRING == " + idString);

const resultPosts = await prisma.project.findMany({
  where: {
      supervisor_id: {
        contains: Array.isArray(idString)
          ? idString[0]
          : idString,
      },
  },
});


	return res.json(resultPosts);
}
