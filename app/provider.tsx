"use client";
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import PopularCityList from './_components/PopularCityList'
import { usePathname } from "next/navigation";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({children,}:Readonly<{children:React.ReactNode}>)
{



  const createUser=useMutation(api.user.CreateNewUser)
  const [userDetail,setUserDetail]=useState<any>()
  const {user}=useUser()

  useEffect(()=>{
    user&&CreateNewUser();
  },[user])


  const CreateNewUser=async()=>{
    // Save new user if not exist

  if(user)
  {
    const result=await createUser(
      {
        email:user?.primaryEmailAddress?.emailAddress??'',
        imageUrl:user?.imageUrl,
        name:user?.fullName??'',
      }
    )

  }

    
  }

    const pathname = usePathname();

  // check if current route is sign-in or sign-up
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";


    return(
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>


          <div>
            <Header/>
            {children}
        </div>

      </UserDetailContext.Provider>

        
    )
}
export default Provider


export const useUserDetail=()=>{
    return useContext(UserDetailContext);
}