import prisma from '../lib/prisma'


interface Discipline {
    id: string[];
}

interface Academic {
    uni_id: string;
    discipline: string;
    school_id: string;
    capacity: number;
    current_load: number;
    supervised_projects: Project[];
    co_supervised_projects: Project[];
    second_marker_of_projects: Project[];
    marking_presentation: Presentation[];
}

interface Student {
    CP: number;
    WAM: number;
    discipline: string;
    uni_id: string;
    project_id: number;
    presenting: boolean;
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
    student: Student[];
}

interface Presentation {
    id: number;
    time: Date;
    markers: Academic[];
    presentor: Student;
    presentor_id: string;
    presentation_session: Presentation_session;
    presentation_session_id: number;
}

interface Presentation_session {
    id: number;
    address: string;
    time: Date;
    chair_id: string;
    chair: Academic
    presentations: Presentation[]
}

async function ForPresentation() {
    const student = await prisma.student.findMany({
        include: {
            presenting: true,
        }
    });
    const academic = await prisma.academic.findMany({
        include: {
            supervised_projects: true,
            co_supervised_projects: true,
            second_marker_of_projects: true,
            marking_presentation: true,
            }
    });
    const project = await prisma.project.findMany({
        include: {
            supervisor: true,
            students: true,
        }
    });
    var allInfo = [student,academic,project]
    return allInfo
}

let markerJson = ForPresentation().then(function(result) {

    // Dont remove
    const strify = JSON.stringify(result);
    const parsed = JSON.parse(strify);
    
    var studentlist = parsed[0];
    var academicslist = parsed[1];
    var projectlist = parsed[2];

    // casts academic to Academic interface 
    studentlist.forEach((student: Student) =>{
        //console.log(student.presenting);               
    });

    // casts project to Project interface
    academicslist.forEach((academic: Academic) =>{
        //console.log(academic.marking_presentation); 
    });

    projectlist.forEach((project: Project) => {
        console.log(project.supervisor_id);
        console.log(project.student);
    });
});