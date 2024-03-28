
import {Student,Project} from "../algorithmUtils/thesisAllocationUtil"
import prisma from "../lib/prisma";

// Update the Student type to include the project property
//type UpdatedStudent = Student & { project?: Project };

export function thesisAllocate(students: Student[], theses: Project[]): Student[]{
  // Sort students based on WAM in descending order
  const sortedStudents = students.sort((a, b) => b.WAM - a.WAM);
  console.log(sortedStudents);
  // Iterate through sorted students
  for (const student of sortedStudents) {
  //  const projects: Project[] = await getProjectPreferencesForStudent(student.uni_id);

//     if (projects) {
//  //     // Find the first project preference with non-zero size
// //    const availableProject = projects.find((project) => project && project.size !== undefined && project.size > 0);
// // 
//       // if (availableProject) {
//         // Update the student's project_id to the selected project's id
//         await prisma.student.update({
//           where: { uni_id: student.uni_id },
//           data: { project_id: availableProject.id },
//         });

//         // Check if availableProject.size is defined before updating
//         if (availableProject.size !== undefined) {
//           // Update the project's size
//           await prisma.project.update({
//             where: { id: availableProject.id },
//             data: { size: availableProject.size - 1 },
//           });
//         } else {
//           console.error(`Project ${availableProject.id} has an undefined size.`);
//         }

//         // Store the allocated student in the result array
//         (student as UpdatedStudent).project = availableProject; // Cast student to UpdatedStudent
//       } else {
//         console.error(`No available project found for student ${student.uni_id}`);
//       }
//     } else {
//       console.error(`No project preferences found for student ${student.uni_id}`);
//     }
//   }
//   console.log('Sorted Students with Allocated Projects:');
//   console.log(sortedStudents);

}
return sortedStudents;

}


//async function getProjectPreferencesForStudent(studentUniId: string) {
//  const student = await prisma.student.findUnique({
//    where: { uni_id: studentUniId },
//    include: {
//      preferences: {
//        include: {
//          pref1: true,
//          pref2: true,
//          pref3: true,
//          pref4: true,
//          pref5: true,
//        },
//      },
//    },
//  });

 // if (student) {
 //   const preferences = student.preferences;
 //   const projects: Project[] = [
 //     preferences?.pref1,
 //     preferences?.pref2,
 //     preferences?.pref3,
 //     preferences?.pref4,
 //     preferences?.pref5,
 //   ].filter((project) => project !== null) as Project[];

 //   return projects;
 // } else {
 //   return []; // Student not found
 // }
//}

export function compareWAM(a: Student, b: Student): number {
    if (a.WAM < b.WAM) {
      return -1;
    } else if (a.WAM > b.WAM) {
      return 1;
    } else {
      return 0;
    }
  }

  export function quickSort(arr: Student[], compareFn: (a: Student, b: Student) => number): Student[] {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      const comparison = compareFn(arr[i], pivot);
      if (comparison < 0) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }  
    return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
  }
