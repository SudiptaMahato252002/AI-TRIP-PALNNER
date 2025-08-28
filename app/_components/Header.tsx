'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'

const menuOptions=[{name:'Home',path:'/'},
    {name:'Pricing', path:'/pricing'},
    {name:'Contact Us',path:'/contact-us'}]

const Header = () => {

    const {user}=useUser()
  return (
    <div className='flex justify-between p-4 items-center'>
        {/* {Logo} */}
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt='logo' width={30} height={30}></Image>
            <h2 className='font-bold text-2xl' >AI Trip Planner</h2>
        </div>
        {/* {MenuOptions} */}
        <div className='flex gap-8 items-center '>
            {menuOptions.map((menu,index)=>{
                return(<Link href={menu.path} key={menu.path}>
                     <h2 className='text-lg hover:scale-105 transition all hover:text-primary'>{menu.name}</h2>
                </Link>
               ) 
            })}
        </div>
        {/* {Get started button} */}
        <div>
            {!user?<SignInButton mode='modal'>
            <Button>Get Started</Button>
            </SignInButton>:
            (<Link href={'/create-new-trip'}>
                <Button className='transition all cursor-pointer'>
                    Create-New-Trip
                </Button>
            </Link>)
            }
            
        </div>
        
    </div>
  )
}

export default Header