import { assignMarkerToThesis } from '../algorithms/markerAlgorithm';
import prisma from '../lib/prisma'
import { updCurrentLoad, updSecondMarker } from './updSecondMarker';

export interface Discipline {
    id: string;
}

export interface Academic {
    uni_id: string;
    discipline: string;
    school_id: string;
    capacity: number;
    current_load: number;
}

export interface Preferences {
    student_id: string;
    pref1_id: number;
    pref2_id: number;
    pref3_id: number;
    pref4_id: number;
    pref5_id: number;
}
export interface Student {
    CP: number;
    WAM: number;
    discipline: string;
    uni_id: string;
    project_id: number;
    preferences: Preferences;
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
    disciplines: Discipline[];
}
async function allocateMarkers(){
    async function ForMarker() {
        const project = await prisma.project.findMany({
            include: {
                disciplines: true,
            }
        });
        const academic = await prisma.academic.findMany({
            include:{
                discipline_enum: true,
            }
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
            //console.log(academic.discipline);               
        });
    
        // casts project to Project interface
        projectlist.forEach((project: Project) =>{
            //console.log(project.research_question); 
            var disciplineslist = project.disciplines;
            disciplineslist.forEach((discipline: Discipline) =>{
                //console.log(discipline.id);
            });
            //console.log(project.disciplines);
        });
        //assignMarkerToThesis(projectlist, academicslist);
        garbage(assignMarkerToThesis(projectlist, academicslist));
        
    });
    
    async function garbage(result:any){
        const strify = JSON.stringify(result);
        const parsed = JSON.parse(strify);
    
        var projectlist: Project[] = parsed[0];
        var academicslist: Academic[] = parsed[1];
    
        for(var i = 0; i < projectlist.length; i++){
            console.log("Updating second marker updation");
            console.log(projectlist[i].id);
            console.log(projectlist[i].second_marker_id);
            const upd = await prisma.project.update({
                where:{
                    id: projectlist[i].id, 
                },
                data: {
                    second_marker_id: projectlist[i].second_marker_id, 
                },
            })
            prisma.$disconnect;
        }
        
        
        for(var i = 0; i < academicslist.length; i++){
            console.log("Academic Capacity Updating");
            const upd = await prisma.academic.update({
                where:{
    
                    uni_id: academicslist[i].uni_id, 
                },
                data: {
                    current_load: academicslist[i].current_load, 
                },
            })
            prisma.$disconnect;
            //console.log(upd);
        }
        //console.log("After Running Algorithm \n")
    
        for(var i = 0; i < projectlist.length; i++){
            console.log("The Project ID " + projectlist[i].id);
            console.log("Second Marker ID " + projectlist[i].second_marker_id);
        }
    
        for(var i = 0; i < projectlist.length; i++){
            console.log("The Project ID is: " + projectlist[i].id);
            console.log("Second Marker ID is: " + projectlist[i].second_marker_id);
            projectlist[i].disciplines.forEach((discipline: Discipline) =>{
                console.log("The Project is in the disciplines: "+ discipline.id);
            });
            console.log("Second Marker Discipline is: " + getDisciplineFromID(academicslist,projectlist[i].second_marker_id));
            console.log("");
        }
    
    }
    
}
export function getDisciplineFromID(academic: Academic[],marker:string){
    for(var i=0;i<academic.length;i++){
        if(academic[i].uni_id == marker){
            return academic[i].discipline
        }
    }
    return "Broken";
}
allocateMarkers();
// Start For Max
// async function ForMarker() {
//     const project = await prisma.project.findMany({
//         include: {
//             disciplines: true,
//         }
//     });
//     const academic = await prisma.academic.findMany({
//         include:{
//             discipline_enum: true,
//         }
//     });

//     var allInfo = [project,academic]
//     return allInfo;
// }

// let markerJson = ForMarker().then(function(result) {

//     // Dont remove
//     const strify = JSON.stringify(result);
//     const parsed = JSON.parse(strify);
    
//     var projectlist = parsed[0];
//     var academicslist = parsed[1];
    
//     // casts academic to Academic interface 
//     academicslist.forEach((academic: Academic) =>{
//         //console.log(academic.discipline);               
//     });

//     // casts project to Project interface
//     projectlist.forEach((project: Project) =>{
//         //console.log(project.research_question); 
//         var disciplineslist = project.disciplines;
//         disciplineslist.forEach((discipline: Discipline) =>{
//             //console.log(discipline.id);
//         });
//         //console.log(project.disciplines);
//     });
//     //assignMarkerToThesis(projectlist, academicslist);
//     garbage(assignMarkerToThesis(projectlist, academicslist));
    
// });

// async function garbage(result:any){
//     const strify = JSON.stringify(result);
//     const parsed = JSON.parse(strify);

//     var projectlist: Project[] = parsed[0];
//     var academicslist: Academic[] = parsed[1];

//     for(var i = 0; i < projectlist.length; i++){
//         console.log("Updating second marker updation");
//         console.log(projectlist[i].id);
//         console.log(projectlist[i].second_marker_id);
//         const upd = await prisma.project.update({
//             where:{
//                 id: projectlist[i].id, 
//             },
//             data: {
//                 second_marker_id: projectlist[i].second_marker_id, 
//             },
//         })
//         prisma.$disconnect;
//     }
    
    
//     for(var i = 0; i < academicslist.length; i++){
//         console.log("Academic Capacity Updating");
//         const upd = await prisma.academic.update({
//             where:{

//                 uni_id: academicslist[i].uni_id, 
//             },
//             data: {
//                 current_load: academicslist[i].current_load, 
//             },
//         })
//         prisma.$disconnect;
//         //console.log(upd);
//     }
//     //console.log("After Running Algorithm \n")

//     for(var i = 0; i < projectlist.length; i++){
//         console.log("The Project ID " + projectlist[i].id);
//         console.log("Second Marker ID " + projectlist[i].second_marker_id);
//     }

//     for(var i = 0; i < projectlist.length; i++){
//         console.log("The Project ID is: " + projectlist[i].id);
//         console.log("Second Marker ID is: " + projectlist[i].second_marker_id);
//         projectlist[i].disciplines.forEach((discipline: Discipline) =>{
//             console.log("The Project is in the disciplines: "+ discipline.id);
//         });
//         console.log("Second Marker Discipline is: " + getDisciplineFromID(academicslist,projectlist[i].second_marker_id));
//         console.log("");
//     }

// }

// export function getDisciplineFromID(academic: Academic[],marker:string){
//     for(var i=0;i<academic.length;i++){
//         if(academic[i].uni_id == marker){
//             return academic[i].discipline
//         }
//     }
//     return "Broken";
// }
// End For Max