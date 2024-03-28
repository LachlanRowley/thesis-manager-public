import prisma from '../lib/prisma'

async function getSecondMarkerAlloc(){
    const result = await prisma.$queryRaw`SELECT project.id,project.second_marker_id from project;`
    const jasonstr = JSON.stringify(result)
    const jason = JSON.parse(jasonstr);
    console.log(jason);

}

async function getAllThesis(){
    const result = await prisma.$queryRaw`SELECT student.uni_id,student.project_id from student;`
    const jasonstr = JSON.stringify(result)
    const jason = JSON.parse(jasonstr);
    console.log(jason);
}

async function getThesisAllocDesc(){
    const result = await prisma.$queryRaw`SELECT student.uni_id,student.project_id,project.description from student,project  student.project_id=project.id;`
    const jasonstr = JSON.stringify(result)
    const jason = JSON.parse(jasonstr);
    console.log(jason);
}

getSecondMarkerAlloc();
//getAllThesis();
//getThesisAllocDesc();