import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/preferences/updateStudentPrefs

//call this method with a POST with a body matching schema
//You do not need to include all pref_ids, only the ones being changed

/* EXAMPLE
    const updatedPrefs = {
        id: 1
        newPrefs = [PREF_IDS]
    }

    fetch("/api/preferences/updateStudentPrefs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPrefs),
    });

*/

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {student_id, newPrefs} = req.body;

    const prefIds = [8,9,10,11,18]
    //Clear relations
    await prisma.student.update({
        include: {
            preferences: true
        },
        where: {uni_id : student_id},
        data: {
            preferences: {
                set: []
            }
        },
});
    const result = await prisma.student.update({
        include: {
            preferences: true
        },
        where: {uni_id : student_id},
        data: {
            preferences: {
                connect: newPrefs.map((id: number) => ({id}))
            }
        },
    });

  return res.status(201).json(result);
}