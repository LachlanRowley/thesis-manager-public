import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/students/create

//call this method with a POST with a body matching schema

/* EXAMPLE PROJECT
   const newProject = {
        email: "violetta.abrahamovich@students.mq.edu.au",
        uni_id: "86331689",
        password: "test",
        firstname: "Violetta",
        lastname: "Abrahamovich",
        program_lead: false,
        WAM: 51.0,
        CP: 20,
        disciple: "software"
        preferences: [1,2,3,4],
    }

    fetch("/api/projects/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
    });

*/


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {email, uni_id, password, firstname ,lastname, program_lead, WAM, 
        cp, discipline, preferences} = req.body;
    try {
        const newStudent = await prisma.student.create({
            include: {
            },
            data: {
                email: email,
                
            },
        });
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(500).json({error: "error creating student"});
    }
}