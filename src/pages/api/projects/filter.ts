import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// GET /api/projects/filter?searchString=searchString&disciplineString=disciplineString
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { searchString, disciplineString } = req.query
  console.log(searchString + ", " + disciplineString);
  const resultPosts = await prisma.project.findMany({
where:	{
	 OR: [
	   {
		///Check if the search string in the title
		title: {
		  contains: Array.isArray(searchString)
		    ? searchString[0]
		    : searchString,
		  contains: Array.isArray(disciplineString)
		    ? disciplineString[0]
		    : disciplineString,
		},
	   },
	   {
		///Check if the search string is in the research question
		research_question: {
		  contains: Array.isArray(searchString)
		    ? searchString[0]
		    : searchString,
		  contains: Array.isArray(disciplineString)
		    ? disciplineString[0]
		    : disciplineString,
		},
	   },
	   {
		///Check if the search string is in the description
		description: {
		  contains: Array.isArray(searchString)
		    ? searchString[0]
		    : searchString,
		  contains: Array.isArray(disciplineString)
		    ? disciplineString[0]
		    : disciplineString,
		},
	   },
	   {
		///Check if the search string is in the discipline
		disciplines: {
		  some : {
		    id: {
			 contains: Array.isArray(searchString)
			 ? searchString[0]
			 : searchString,
		  contains: Array.isArray(disciplineString)
		    ? disciplineString[0]
		    : disciplineString,
		    }
		  }
		}
	   }
	 ]
	}
  })
  return res.json(resultPosts)
}
