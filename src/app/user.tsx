'use client'

import { useSession } from 'next-auth/react'
import { Session } from 'next-auth';
import { User as UserType } from '@prisma/client';

interface ExtendedSession extends Session {
  user: UserType & {
    id: string;
    uni_id: string;
    firstname: string;
    lastname: string;
    user_type: string;
    user_type_id: string;
    student: any; 
    academic: any; 
  }
}


export const User = () => {
  const { data: session } = useSession() as { data: ExtendedSession | null };

  if (session?.user) {
    console.log(session.user.uni_id)
    console.log(session.user.academic)
  }

  return <pre> {JSON.stringify(session)}</pre>
}