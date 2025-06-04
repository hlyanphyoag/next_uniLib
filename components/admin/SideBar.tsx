'use client'
import React from 'react'
import Image from "next/image";
import {adminSideBarLinks} from "@/constants";
import Link from "next/link";
import {cn, getInitials} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {Avatar, AvatarFallback} from "@/components/ui/avater";
import {Session} from "next-auth";

const SideBar = ({session}: {session: Session}) => {
    const pathName = usePathname()
    return (
        <div className="admin-sidebar">
            <div>
                <div className="logo">
                    <Image src='/icons/admin/logo.svg' alt='logo' height={37} width={37} />
                    <h1>BookWise</h1>
                </div>
                <div className="mt-10 flex flex-col gap-5">
                    {adminSideBarLinks.map((link) => {
                        const isSelected = (
                            link.route !== '/admin' &&
                            pathName.includes(link.route) &&
                            link.route.length > 1) || pathName  === link.route;

                        return (
                            <Link href={link.route} key={link.route}>
                                <div className={cn('link', isSelected && 'bg-primary-admin shadow-sm')}>
                                    <div className='relative size-6'>
                                        <Image
                                            src={link.img}
                                            alt="icon"
                                            fill
                                            className={`${isSelected ? 'brightness-0 invert': ''} object-contain`}/>
                                    </div>
                                    <p className={cn(isSelected ? 'text-white' : 'text-dark')}>{link.text}</p>
                                </div>

                            </Link>
                        )
                    })}
                    <div className = 'user'>
                        <Avatar className=''>
                            <AvatarFallback className='font-medium bg-amber-100'>{getInitials(session?.user?.name || '')}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <p className="font-semibold text-dark-200 max-md:hidden">{session?.user.name}</p>
                            <p className="text-xs text-light-500 max-md:hidden">{session?.user.email}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default SideBar
