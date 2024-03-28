"use client"

import { getSession } from "next-auth/react";

export interface detailedUserData {
    id: number;
    email: string;
    uni_id: string;
    password: string;
    firstname: string;
    lastname: string;
    user_type_id: string;
    program_lead: boolean;
    student: {
        CP: number;
        WAM: number;
        discipline: string;
        uni_id: string;
        project_id: number | null;
    } | null;
    academic: {
        uni_id: string;
        discipline: string;
        school_id: string;
        capacity: number;
        current_load: number;
    } | null;
}

// gets the data for the current user logged in, if any
export async function getCurrentUser() {
    const session = await getSession();
    if (session?.user?.email) {
        const response = 
            await fetch(`http://localhost:3000/api/users/getDetailed?email=${session.user.email}`);
        const data: detailedUserData = await response.json();
        return data;
    }
    return null;
}