"use client";
import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import PopularCityList from './_components/PopularCityList'
import { usePathname } from "next/navigation";

function Provider({children,}:Readonly<{children:React.ReactNode}>)
{

    const pathname = usePathname();

  // check if current route is sign-in or sign-up
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";


    return(
        <div>
            <Header/>
             {isAuthPage ? (
        <div className="auth-container">{children}</div> // only show auth form
      ) : (
        <>
          <Hero />
          <PopularCityList />
          {children}
        </>
      )}
        </div>
    )
}
export default Provider