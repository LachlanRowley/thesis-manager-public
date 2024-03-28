import prisma from '../lib/prisma'
//import { PrismaClient } from "@prisma/client";

//updAssignThesis(student_id: string, project_id: number)
async function updAssignThesis(in_stuid: string, in_projectId: number){
    const upd = await prisma.student.update({
        where:{
            uni_id: in_stuid, 
        },
        data: {
            project_id: in_projectId,
        },
    })
    console.log(upd);
}

//e.g. use
// updAssignThesis('86331689',2);
// updAssignThesis('86175806',3); 
