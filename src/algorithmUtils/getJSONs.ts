//import { get } from 'http'
import prisma from '../lib/prisma'
import * as fs from 'fs';

interface Discipline {
    id: string[];
}

interface Academic {
    uni_id: string;
    discipline: string;
    school_id: string;
    capacity: number;
    current_load: number;
}

interface Preferences {
    student_id: string;
    pref1_id: number;
    pref2_id: number;
    pref3_id: number;
    pref4_id: number;
    pref5_id: number;
}
interface Student {
    CP: number;
    WAM: number;
    discipline: string;
    uni_id: string;
    project_id: number;
    preferences: Preferences;
}

interface Project {
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

// interface ProjectMap {
//     [project:string] : Project;
// }


// Start For Max
async function ForMarker() {
    const project = await prisma.project.findMany({
        include: {
            disciplines: true,
        }
    });
    const academic = await prisma.academic.findMany({
    });
    var allInfo = [project,academic]
    return allInfo;
}

let markerJson = ForMarker().then(function(result) {

    // Dont remove
    const strify = JSON.stringify(result);
    const parsed = JSON.parse(strify);
    
    var projectlist = parsed[0];
    var academicslist = parsed[1];
    
    // casts academic to Academic interface 
    academicslist.forEach((academic: Academic) =>{
        console.log(academic.discipline);               
    });

    // casts project to Project interface
    projectlist.forEach((project: Project) =>{
        console.log(project.research_question); 
    });

    // Means to get each parameter from academic / project as separate arrays

    // console.log(parsed);
    // let studentIds: number[] = [];
    // let projectDiscipline: any[] = [];
    // let academicIds: number[] = [];
    // let academicDiscipline: string[] = [];
    // let academicCapacity: number[] = [];
    // let academicCurrLoad: number[] = [];
    // for(var i = 0;i < parsed[0].length;i++){
    //     studentIds.push(parsed[0][i].id);
    //     projectDiscipline.push(parsed[0][i].disciplines);
    // }
    // for(var i = 0;i < parsed[1].length;i++){
    //     academicIds.push(parsed[1][i].uni_id);
    //     academicDiscipline.push(parsed[1][i].discipline);
    //     academicCapacity.push(parsed[1][i].capacity);
    //     academicCurrLoad.push(parsed[1][i].current_load);
    // }
    // console.log(studentIds);
    // console.log(projectDiscipline);
    // console.log(academicIds);
    // console.log(academicDiscipline);
    // console.log(academicCapacity);
    // console.log(academicCurrLoad);

    // PUT ALGORITHM HERE ALGORITHM()
});
// End For Max


// Start For Angus

async function ForThesis(){
    const project = await prisma.project.findMany({
        include: {
            disciplines: true,
            first_preferred: true,
            second_preferred: true,
            third_preferred: true,
            fourth_preferred: true,
            fifth_preferred: true,
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
        console.log(project.industry_supervisor);
    });

    // Cast student to Student Intrafec
    studentlist.forEach((student: Student) =>{
        console.log(student.WAM);
    });

    // Method to get each parameter as an array
    //console.log(parsed);
    // let studentIds: number[] = [];
    // let studentPreferences: any[] = [];
    // let studentWAMs: number[] = [];
    
    
    // for (var i = 0; i < parsed[1].length; i++) {
    //     studentIds.push(parsed[1][i].uni_id);
    //     studentPreferences.push(parsed[1][i].preferences);
    //     studentWAMs.push(parsed[1][i].WAM);
    // }
    // console.log(studentIds);
    // console.log(studentPreferences);
    // console.log(studentWAMs);
    // console.log(result);
    
    // PUT ALGORITHM HERE ALGORITHM()
});
// End For Angus


// METHOD 2 //

// let allThings = (async () => {  
//     async function main() {  
//         var users = await prisma.user.findMany();
//         var students = await prisma.student.findMany();
//         var disciplines = await prisma.discipline.findMany();
//         var projects = await prisma.project.findMany();
//         var supervisors = await prisma.discipline.findMany();
//         var academics = await prisma.academic.findMany();
//         var allInfo = [users, students,disciplines,projects, supervisors,academics];
//         return allInfo;
//     }
  
//     const allDetails = await main();  
//     const usersJson = allDetails[0];
//     const studentsJson = allDetails[1];
//     const disciplinesJson = allDetails[2];
//     const projectsJson = allDetails[3];
//     const supervisorJson = allDetails[4];
//     const academicsJson = allDetails[5];

    // example output
    // console.log(usersJson);
    // console.log(studentsJson);
    // console.log(disciplinesJson);
    // console.log(projectsJson);
    // console.log(supervisorJson);
    // console.log(academicsJson);


    //Put algorithm function here with required Json parameters
    


  //})()