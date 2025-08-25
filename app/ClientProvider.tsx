"use client";
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import React, { Children, ReactNode } from 'react'
import Provider from './provider'


const convex=new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)



const ClientProvider = ({children}:{children:ReactNode}) => {
  return (
    <ConvexProvider client={convex}>
        <Provider>
        {children}
        </Provider>
        </ConvexProvider>
  )
}

export default ClientProvider