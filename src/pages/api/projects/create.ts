import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Discipline } from '@prisma/client';

// PUT /api/projects/create

//call this method with a POST with a body matching the req.body

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
    labs_list: [1,2]
   }
*/


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    const {title, research_question, description, discipline_list ,skills, status, project_type, industry_topic, 
    industry_supervisor, size, supervisor_id, co_supervisors_list, labs_list} = req.body;

    try {
        const newProject = await prisma.project.create({
            include: {
                disciplines : true,
                status_enum : true,
                project_type_enum : true,
                supervisor: true
            },
            data: {
                title: title,
                research_question: research_question,
                description: description,
                skills: skills,

                disciplines: {
                    connect: discipline_list.map((id: string) => ({ id })),
                },
                status_enum: {
                    connect: {
                        id: status
                    }
                },
                project_type_enum: {
                    connect: {
                        id: project_type
                    }
                },
                industry_topic: industry_topic,
                industry_supervisor: industry_supervisor,
                size: size,
                supervisor: {
                    connect: {
                        uni_id: supervisor_id
                    }
                },
                co_supervisors: {
                    connect: co_supervisors_list.map((uni_id: string) => ({ uni_id })),
                },
                lab_access: {
                    connect: labs_list.map((id: Number) => ({ id })),
                },
            },
        });
        res.status(201).json(newProject)
        console.log(newProject);
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({error: "error creating project"});
    }
}
