import { auth } from '@/auth'

import Image from 'next/image'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async({children} : {children : ReactNode}) => {
  // const session = await auth();
  // if(!session) redirect('/sign-in')
  return (
    <main className='auth-container'>
         <section className='auth-form'>
            <div className='auth-box'>
                <div className='flex flex-row gap-3'>
                        <Image
                            src='/icons/logo.svg'
                            width={37}
                            height={37}
                            alt='logo'
                        />
                        <p className='text-2xl font-semibold text-white'>Bookwise</p>  
                </div>
               <div>{children}</div>
            </div>
         </section>

         <section className='auth-illustration'>
            <Image
                src='/images/auth-illustration.png'
                height={1000}
                width={1000}
                alt='auth-illustration'
                className='object-cover size-full'
            />
         </section>
    </main>
  )
}

export default layout