import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/projects/filterProjects?searchString=searchString&disciplineString=disciplineString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { searchString, disciplineString } = req.query
const resultPosts = await prisma.project.findMany({
  include: { disciplines: true },
  where: {
    AND: [
      {
        OR: [
          {
            title: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
          {
            research_question: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
		  {
            description: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
		  {
            skills: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
		  {
            project_type: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
		  {
            supervisor_id: {
              contains: Array.isArray(searchString)
                ? searchString[0]
                : searchString,
            },
          },
        ],
      },

      // Second filter

      {
        disciplines: {
          some: {
            id: {
              contains: Array.isArray(disciplineString)
                ? disciplineString[0]
                : disciplineString,
            },
          },
        },
      },
    ],
  },
});

/*			Sort by title, but means that the order becomes PROJ1, PROJ10 ... PROJ1X ... PROJ2, PROJ2X -> etc
resultPosts.sort( function(a, b)	{
	a = a.title.toLowerCase();
	b = b.title.toLowerCase();

	return a < b ? -1 : a > b ? 1 : 0;
});
const resJSON = JSON.stringify(resultPosts);


console.log(resJSON);
*/

//Sort by natural sorting, to preserve the number values in the title string (i.e. PROJ10 comes after PROJ9, not directly after PROJ1)
resultPosts.sort(function(a, b)	{
	var re = /(\d+)/g;

	var numA = a.title.match(re);
	var numB = b.title.match(re);

	if (numA && numB)	{
		return parseInt(numA[0], 10) - parseInt(numB[0], 10);
	} else	{
		return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
	}
});

  return res.json(resultPosts)
}
