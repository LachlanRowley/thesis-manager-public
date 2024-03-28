import prisma from '../lib/prisma'


// updSecondMarker(in_projectid:number, in_markerid:string)

export async function updSecondMarker(in_projectId: number, in_markerid: string){
    const upd = await prisma.project.update({
        where:{
            id: in_projectId, 
        },
        data: {
            second_marker_id: in_markerid, 
        },
    })
    console.log(upd);
}

// updCurrentLoad(in_markerid:string, in_currentLoad:number)

export async function updCurrentLoad(in_markerid: string, in_currentLoad: number){
    const upd = await prisma.academic.update({
        where:{
            uni_id: in_markerid, 
        },
        data: {
            current_load: in_currentLoad, 
        },
    })
    console.log(upd);
}

//e.g. use
//updSecondMarker(1,'mq33260056');
//updCurrentLoad('mq33260056',2);