import { thesisAllocate } from '../algorithms/thesisAllocation';
import prisma from '../lib/prisma'


export interface Student {
    project: Project;
    CP: number;
    WAM: number;
    discipline: string;
    uni_id: string;
    project_id: number;
    preferences: Project[];
}

export interface Project {
    id: number;
    title: string;
    research_question: string;
    description: string;
    skills: string;
    status: string;
    project_type: string;
    industry_topic: boolean;
    industry_supervisor: string;
    size: number;
    supervisor_id: string;
    second_marker_id: string;
    disciplines: Discipline;
}

interface Discipline {
    id: string[];
}

// Start For Angus

async function allocateThesis(){
    async function ForThesis(){
        const project = await prisma.project.findMany({
            include: {
                disciplines: true,
            }
        });
        const student = await prisma.student.findMany({
            include: {
                preferences: true,
            }
        });
        var allInfo = [project, student]
        return allInfo;
    }
    
    let studentJson = ForThesis().then(function(result) {
    
        // Dont remove
        const strify = JSON.stringify(result);
        const parsed = JSON.parse(strify);
    
        var projectlist = parsed[0];
        var studentlist = parsed[1]; // as Student;
        
        // Casting project to Project Interface
            projectlist.forEach((project: Project) =>{
            //console.log(project.industry_supervisor);
        });
    
        // Cast student to Student Intrafec
            studentlist.forEach((student: Student) =>{
            //console.log(student.WAM);
        });
    
        // PUT ALGORITHM HERE ALGORITHM()
        garbage(thesisAllocate(studentlist, projectlist));
    
    
    });
    
    async function garbage(result:any){
        const strify = JSON.stringify(result);
        const parsed = JSON.parse(strify);
        var studentsList: Student[] = parsed;
        console.log(studentsList[0]);
    
        for(var i = 0; i < studentsList.length; i++){
            console.log("Updating thesis allocation");
            console.log(studentsList[i].uni_id);
            console.log(studentsList[i].project_id);
            const upd = await prisma.student.update({
                where:{
                    uni_id: studentsList[i].uni_id, 
                },
                data: {
                    project_id: studentsList[i].project_id, 
                },
            })
            prisma.$disconnect;
        }
    }
}
allocateThesis();
// async function ForThesis(){
//     const project = await prisma.project.findMany({
//         include: {
//             disciplines: true,
//         }
//     });
//     const student = await prisma.student.findMany({
//         include: {
//             preferences: true,
//         }
//     });
//     var allInfo = [project, student]
//     return allInfo;
// }

// let studentJson = ForThesis().then(function(result) {

//     // Dont remove
//     const strify = JSON.stringify(result);
//     const parsed = JSON.parse(strify);

//     var projectlist = parsed[0];
//     var studentlist = parsed[1]; // as Student;
    
//     // Casting project to Project Interface
//         projectlist.forEach((project: Project) =>{
//         //console.log(project.industry_supervisor);
//     });

//     // Cast student to Student Intrafec
//         studentlist.forEach((student: Student) =>{
//         //console.log(student.WAM);
//     });

//     // PUT ALGORITHM HERE ALGORITHM()
//     garbage(thesisAllocate(studentlist, projectlist));


// });

// async function garbage(result:any){
//     const strify = JSON.stringify(result);
//     const parsed = JSON.parse(strify);
//     var studentsList: Student[] = parsed;
//     console.log(studentsList[0]);

//     for(var i = 0; i < studentsList.length; i++){
//         console.log("Updating thesis allocation");
//         console.log(studentsList[i].uni_id);
//         console.log(studentsList[i].project_id);
//         const upd = await prisma.student.update({
//             where:{
//                 uni_id: studentsList[i].uni_id, 
//             },
//             data: {
//                 project_id: studentsList[i].project_id, 
//             },
//         })
//         prisma.$disconnect;
//     }
// }

// End For Angus