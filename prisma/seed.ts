import { ConstructionOutlined, SouthAmerica } from '@mui/icons-material'
import { PrismaClient, Prisma } from '@prisma/client'
import { Optional } from '@prisma/client/runtime/library'
import { hash } from 'bcrypt'
import { dir, log } from 'console'

const prisma = new PrismaClient()

// enums
const academicSchoolData: Prisma.Academic_schoolCreateInput[] = [
  {
    id: "computing",
  },
  {
    id: "engineering"
  }
]
const projectTypeData: Prisma.Project_typeCreateInput[] = [
  {
    id: "undergraduate"
  },
  {
    id: "masters"
  },
  {
    id: "both"
  }
]
const projectStatusData: Prisma.Project_statusCreateInput[] = [
  {
    id: "available"
  },
  {
    id: "unavailable"
  },
  {
    id: "withdrawn"
  },
  {
    id: "in_progress"
  },
]
const userTypeData: Prisma.User_typeCreateInput[] = [
  {
    id: "student"
  },
  {
    id: "academic"
  }
]

// preset tables
const disciplineData: Prisma.DisciplineCreateInput[] = [
  {
    id: "civil"
  },
  {
    id: "electrical"
  },
  {
    id: "electronics"
  },
  {
    id: "mechanical"
  },
  {
    id: "mechatronics"
  },
  {
    id: "software"
  },
  {
    id: "telecommunications"
  }
]

const labData: Prisma.LabCreateInput[] = [
  {
    name: 'mech lab1',
    description: 'for mech students',
    address: '1 Main Street'
  },
  {
    name: 'comp lab1',
    description: 'for comp students',
    address: '2 Main Street'
  },
  {
    name: 'comp lab2',
    description: 'for comp students',
    address: '3 Main Street'
  },
]

function generateFakeProjects(amount: number,
  unavailMinAmount?: number,
  withdrawinMinAmount?: number,
  civilMinAmount?: number,
  electricalMinAmount?: number,
  electronicsMinAmount?: number,
  mechanicalMinAmount?: number,
  mechatronicsMinAmount?: number,
  softwareMinAmount?: number,
  telecommunicationsMinAmount?: number,
  ): Prisma.ProjectCreateWithoutSupervisorInput[] {
    const data: Prisma.ProjectCreateWithoutSupervisorInput[] = [];
    const disciplineDataString: string[] = []
    disciplineData.forEach( (e) => {
      disciplineDataString.push(e.id);
    })
    let counter: number = 0;
    
    for(counter = 0; counter < amount; counter++) {
      // unnecessary complex preference randomiser
      let projectDisciplineData: Prisma.DisciplineWhereUniqueInput[] = []
      let projectDisciplineDataString: string[] = []
      let disciplineID: string = '';
      const disciplineAmount: number = Math.floor(Math.random() * (disciplineData.length - 1)) + 1;
      
      
      while(projectDisciplineDataString.length < disciplineAmount) { // random number of disciplins from 0 to disciplineLenth
        if (!(disciplineID.length === 0)){
          if (!projectDisciplineDataString.includes(disciplineID)) {
            projectDisciplineDataString.push(disciplineID); // pushes if idx isnt already in the array
          } else {
            if ((disciplineDataString.indexOf(disciplineID) + 1) < disciplineDataString.length) {
              disciplineID = disciplineDataString[disciplineDataString.indexOf(disciplineID)+1]  // increments idx by one if its already in the 
            } else {
              disciplineID = disciplineDataString[Math.floor(Math.random() * disciplineDataString.length)]; // randomizes the idx if its not in index range of projectData
            }
          }
        } else {
          disciplineID = disciplineDataString[Math.floor(Math.random() * disciplineDataString.length)]; // randomizes the idx if its not in index range of projectData
        }    
      }

      
      for (let i = 0; i < projectDisciplineDataString.length; i++){
        projectDisciplineData.push({id: projectDisciplineDataString[i]})
      }


      const project_type_randomisation: number = Math.floor(Math.random() * projectTypeData.length);
      let project: Prisma.ProjectCreateWithoutSupervisorInput = {
        title: `PROJ${counter}`,
        research_question: `RESEARCH QUESTION for PROJ${counter}, this is a question that this project seeks to answer.`,
        description: `DESCRIPTION for PROJ${counter}, this is where the content of this project is described in greater detail.`,
        skills: `SKILLS for PROJ${counter}, this section outlines what skills will be learned and what skill will be helpful.`,
        status_enum: { connect: { id: "available" } },
        project_type_enum: { connect: { id: projectTypeData[project_type_randomisation].id } },
        size: Math.floor((Math.random() * 2) + 1), // 1 - 3 people can participate
        disciplines: { connect: projectDisciplineData }
      }

      data.push(project);
    }
    return data;
}



function generateFakeUsers(
  projectData: Prisma.ProjectCreateWithoutSupervisorInput[],
  academics: number, // academics are required for creation of project
  students: number, // students with no pref and no project
  studentsWithProj?: number, // min students w proj
  studentsWithPref?: number, // min students w pref
  academicsAsSupervisor?: number, // min academics as supervisor
  academicsAsDisciplineOverseer?: number, // min academics as unit overseer 
  ): Prisma.UserCreateInput[] {
    let userCounter: number = 0;
    let secondaryCounter: number = 0;
    let tertiaryCounter: number = 0;
    const data: Prisma.UserCreateInput[] = [];
    let projectPopulace: number[] = new Array(projectData.length).fill(0);

    // all idx of projects generated
    let projectList = Array.from(Array(projectData.length).keys());
    
    // academics
    for(tertiaryCounter = 0; 
      (academicsAsSupervisor ? tertiaryCounter < academicsAsSupervisor : tertiaryCounter < academics) && 
      !(projectList.length === 0); 
      tertiaryCounter++) {
      
      const supervisingCapacity = Math.floor(Math.random() * 5 + 1); // has capacity of at least 1
      const supervisingLoad = Math.floor(Math.random() * (supervisingCapacity - 1)) + 1; // supervising at least 1
      
      let supervisedProjects: Prisma.ProjectCreateWithoutSupervisorInput[] = [];
      for(let i = 0; i < supervisingLoad; i++) {
        if(projectList.length === 0)
          break;
        const projId: number = projectList.splice(Math.floor(Math.random()*projectList.length),1)[0];
        supervisedProjects.push(projectData[projId])
      }

      
      const academic: Prisma.UserCreateInput = {
        email: `academic.${userCounter}.${secondaryCounter}.${tertiaryCounter}@mq.edu.au`,
        uni_id: `mq${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        password: `test`,
        firstname: `FirstName.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        lastname: `LastName.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        program_lead: false,
        user_type: { connect: { id: "academic" } },
        academic: {
          create: {
            discipline_enum: { connect: { id: disciplineData[Math.floor(Math.random() * disciplineData.length)].id } },
            school: { connect: { id: academicSchoolData[Math.floor(Math.random() * academicSchoolData.length)].id } },
            current_load: supervisingLoad,
            capacity: supervisingCapacity,
            supervised_projects: { create: supervisedProjects }
          }
        }
      } 
      data.push(academic);
      userCounter++;
      secondaryCounter++;
    }



    tertiaryCounter = 0;
    for(; secondaryCounter < academics; userCounter++) { 
      
      const academic: Prisma.UserCreateInput = {
        email: `academic.${userCounter}.${secondaryCounter}.${tertiaryCounter}@mq.edu.au`,
        uni_id: `mq${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        password: `test`,
        firstname: `FirstName.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        lastname: `LastName.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        program_lead: false,
        user_type: { connect: { id: "academic" } },
        academic: {
          create: {
            discipline_enum: { connect: { id: disciplineData[Math.floor(Math.random() * disciplineData.length)].id } },
            current_load: 2,
            school: { connect: { id: academicSchoolData[Math.floor(Math.random() * academicSchoolData.length)].id } },
            capacity: Math.floor(Math.random() * 2), // 0 or 1, either way current load will be 0
          }
        }
      } 
      data.push(academic);
      secondaryCounter++;
      tertiaryCounter++;
    }


    secondaryCounter = 0;
    //let projectPopulace: number[] = Array(projectData.length).fill(0);
    // students with projects
    for(tertiaryCounter = 0; studentsWithProj ? tertiaryCounter < studentsWithProj : tertiaryCounter < 0; tertiaryCounter++) { // students with no pref and no project

      // project selection
      
      let selectedProjectId: number = -1;
      let selectedProjectCandidateId: number = Math.floor(Math.random() * projectData.length);
      while(selectedProjectId === -1) { // when not selected, check if cand is viable (as idx in projData and doesnt exceed proj.size if populace increments)
        if (selectedProjectCandidateId <= projectData.length) {
          if (projectPopulace[selectedProjectCandidateId] < projectData[selectedProjectCandidateId].size) {
            selectedProjectId = selectedProjectCandidateId;
            projectPopulace[selectedProjectId]++;
          } else {
            selectedProjectCandidateId = Math.floor(Math.random() * projectData.length);
          }
        } else {selectedProjectCandidateId++}
      }

      const student: Prisma.UserCreateInput = {
        email: `studentGenProj.${userCounter}.${secondaryCounter}.${tertiaryCounter}@students.mq.edu.au`,
        uni_id: `${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        password: `test`,
        firstname: `FirstNameGenProj.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        lastname: `LastNameGenProj.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        program_lead: false,
        user_type: { connect: { id: "student" } },
        student: {
          create: {
            WAM: 20.0 + Math.floor(Math.random()*800)/10, // random number between 20 and 100 with one decimal point
            CP: Math.floor(Math.random()*2 + 1)*10, // either 10 or 20 (randomly chosen)
            discipline_enum: { connect: { id: disciplineData[Math.floor(Math.random()*disciplineData.length)].id } },
            project: { connect: { id: (selectedProjectId + 1)} }
          }
        }
      } 
      data.push(student);
    
      userCounter++;
      secondaryCounter++;
    }

    // students with preferences
    for(tertiaryCounter = 0; studentsWithPref ? tertiaryCounter < studentsWithPref : tertiaryCounter < 0; tertiaryCounter++) { // students with no pref and no project
      
      // unnecessary complex preference randomiser
      const preferenceData: number[] = []
      let preferenceIdx: number = Math.floor(Math.random() * projectData.length) + 1;
      while(preferenceData.length < 5) {// (projectData.length > 5 ? 5 : projectData.length)) { // if there are less than 5 projects, array will be as long as the project.length
        if (preferenceIdx <= projectData.length) {
          if (preferenceData.includes(preferenceIdx)) {
            preferenceIdx++;  // increments idx by one if its already in the 
          } else {
            preferenceData.push(preferenceIdx); // pushes if idx isnt already in the array
            preferenceIdx = Math.floor(Math.random() * projectData.length) + 1; // randomizes the idx if its not in index range of projectData
          }
        } else {
          preferenceIdx = Math.floor(Math.random() * projectData.length) + 1; // randomizes the idx if its not in index range of projectData
        }
      }

      let preferenceDataInput: Prisma.ProjectWhereUniqueInput[] = []
      preferenceData.forEach((e) => preferenceDataInput.push({id: e}))
      
    //   // student generation
      const student: Prisma.UserCreateInput = {
        email: `studentGenPref.${userCounter}.${secondaryCounter}.${tertiaryCounter}@students.mq.edu.au`,
        uni_id: `${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        password: `test`,
        firstname: `FirstNameGenPref.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        lastname: `LastNameGenPref.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        program_lead: false,
        user_type: { connect: { id: "student" } },
        student: {
          create: {
            WAM: 20.0 + Math.floor(Math.random()*800)/10, // random number between 20 and 100 with one decimal point
            CP: Math.floor(Math.random()*2 + 1)*10, // either 10 or 20 (randomly chosen)
            discipline_enum: { connect: { id: disciplineData[Math.floor(Math.random()*disciplineData.length)].id } },
            preferences: { connect: preferenceDataInput }
          }
        }
      } 
      data.push(student);
      userCounter++;
      secondaryCounter++;
    }
    
    // students with no other data

    tertiaryCounter = 0;
    for(; secondaryCounter < students; userCounter++) { // students with no pref and no project
      
      const student: Prisma.UserCreateInput = {
        email: `student.${userCounter}.${secondaryCounter}.${tertiaryCounter}@students.mq.edu.au`,
        uni_id: `${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        password: `test`,
        firstname: `FirstName.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        lastname: `LastName.${userCounter}.${secondaryCounter}.${tertiaryCounter}`,
        program_lead: false,
        user_type: { connect: { id: "student" } },
        student: {
          create: {
            WAM: 20.0 + Math.floor(Math.random()*800)/10, // random number between 20 and 100 with one decimal point
            CP: Math.floor(Math.random()*2 + 1)*10, // either 10 or 20 (randomly chosen)
            discipline_enum: { connect: { id: disciplineData[Math.floor(Math.random()*disciplineData.length)].id } },
          }
        }
      } 
      data.push(student);
      secondaryCounter++;
      tertiaryCounter++;
    }

    return data;
    
}



// HOW TO USE: generateFakeUsers(generateFakeProjects(<amount of projects>), <amount of academics>, <amount of students>, <OPTIONAL #students with project selected>, <OPTIONAL #students with preferences selected>);
const userData: Prisma.UserCreateInput[] = generateFakeUsers(generateFakeProjects(50), 40, 50, 20, 20);


async function main() {

  // below are the enum values
  console.log("Start seeding enums (sqlite enum workaround)");
  for (const i of academicSchoolData) {
    const school = await prisma.academic_school.upsert({
      where: {
        id: i.id
      },
      update: {},
      create: i
    })
    console.log(school);
  }
  for (const i of projectTypeData) {
    const type = await prisma.project_type.upsert({
      where: {
        id: i.id
      },
      update: {},
      create: i
    })
    console.log(type);
  }
  for (const i of projectStatusData) {
    const status = await prisma.project_status.upsert({
      where: {
        id: i.id
      },
      update: {},
      create: i
    })
    console.log(status);
  }
  for (const i of disciplineData) {
    const discipline = await prisma.discipline.upsert({
      where: {
        id: i.id
      },
      update: {},
      create: i
    })
    console.log(discipline);
  }
  for (const i of userTypeData) {
    const userType = await prisma.user_type.upsert({
      where: {
        id: i.id
      },
      update: {},
      create: i
    })
    console.log(userType);
  }
  console.log("Finish seeding enums");

  // non enum data
  for (const i of labData) {
    const lab = await prisma.lab.upsert({
      where: {
        name: i.name
      },
      update: {},
      create: i
    })
    console.log(lab);
  }
  console.log(`Start seeding users`)
  // TODO

  for (const u of userData) {
    const hashedPassword = await hash(u.password, 12);
    const userWithHashedPassword = { ...u, password: hashedPassword }; // update the password with the hashed value

    const user = await prisma.user.upsert({
      where: {
        uni_id: u.uni_id
      },
      update: {},
      create: userWithHashedPassword,  // use the updated user data with hashed password
    });
    console.log(`Created:`);
    console.dir(userWithHashedPassword);
    console.dir(user);
  }
  console.log(`Finished seeding users`)

  console.log(`Start seeding Google account`)

  try {
    // First, create a User_type record if it doesn't already exist
    const userType = await prisma.user_type.upsert({
      where: { id: 'googleid' },
      update: {},
      create: {
        id: 'googleid',
      },
    });
    console.log('User type created or found:', userType);
    
    // Next, create a User record
    const newUser = await prisma.user.create({
      data: {
        email: 'topyihao@gmail.com',
        uni_id: 'uni12345678',
        password: 'password',
        firstname: 'Michael',
        lastname: 'Zhang',
        user_type_id: userType.id,
        program_lead: false,
      },
    });
    console.log('User created:', newUser);
    
    // Finally, create an Account record for Google OAuth
    const googleAccount = await prisma.account.create({
      data: {
        userId: newUser.id,
        providerType: 'oauth',
        provider: 'google',
        providerAccountId: '116127996025739467889', 
        //actual providerAccountId can be found when you try to login in the terminal
      },
    });
    console.log('Google account created:', googleAccount);
    
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
