'use client'

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    session: any
}

const ClientSessionProvider = ({children, session}: Props) => {
    
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default ClientSessionProvider