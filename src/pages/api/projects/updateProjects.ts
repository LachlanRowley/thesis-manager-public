import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

//DEPRECATED
// PUT /api/projects/updateProjects

/* EXAMPLE PROJECT
   const newProject = {
    title: "Proposed Project",
    research_question: "My Research Q",
    description: "This is a project",
    discipline_list: ["software", "mechatronics"],
    skills: "Needed skills",
    status: "available",
    project_type: "both",
    industry_topic: false,
    industry_supervisor: null,
    size: 1,
    supervisor_id: 1,
    supervisor: "abc"
    co_supervisors_list : [1,2,3],
    labs_list: []
   }
*/


//call this method with a PUT with a body matching the req.body
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    //Change this to fit the submitted form
    const {id, ...data} = req.body;

    try {
        const updateProject = await prisma.project.update({
            where: {id},
            data: {
                ...data
            },
        });
        res.status(201).json(updateProject)
    } catch (error) {
        res.status(500).json({error: "error creating project"});
    }
}