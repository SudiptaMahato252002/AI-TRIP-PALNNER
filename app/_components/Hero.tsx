"use client";
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation';

import React from 'react'



const suggestions=[{title:'Create New Trip',icon:<Globe2 className='text-blue-400 h-5-w-5'></Globe2>},
    {title:'Adventure destination',icon:<Globe2 className='text-yellow-400 h-5-w-5'></Globe2>},
    {title:'Inspire me where to go',icon:<Plane className='text-green-400 h-5-w-5'></Plane>},
    {title:'Discover hidden gems',icon:<Landmark className='text-orange-400 h-5-w-5'></Landmark>}
]

const Hero = () => {

    const {user}=useUser();
    const router=useRouter()

    const onSend=()=>{
        if(!user)
        {
            router.push('/sign-in')
            return;
        }


    }

  return (
    <div className='mt-24 w-full flex flex-col justify-center items-center '>
        {/* {Hey i am your personnal trainer} */}
        <div className='max-w-3xl w-full text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font bold'>Hey, I'm your personal <span className='text-primary'>Trip Planner</span></h1>
            <p className='text-lg'>Tell me what you want I'll handle the rest:Flights,Hotels,trip planning all in seconds.</p>
        </div>
        
        {/* {TextBOX/InputBox } */}
        <div className='w-full max-w-3xl relative p-5'>
            <div className='w-full max-w-3xl relative'>
                <Textarea className='h-28 bg-transparent'placeholder='Create a trip for Paris from New york...'/>
                <Button onClick={()=>onSend()}size={'icon'} className='absolute bottom-6 right-6'>
                    <Send className='h-4 w-4'></Send>
                </Button>
            </div>
            {/* {Suggestion Options} */}
            <div className='flex gap-5 p-5'>
                {suggestions.map((suggestion,index)=>{return(
                <div key={suggestion.title} className='flex items-center gap-2 border rounded-full p-2 hover:bg-primary'>
                    {suggestion.icon}
                    <h2 className='text-sm'>{suggestion.title}</h2>
                </div>
            )})}

            </div>
            
        </div>
        {/* {video section} */}
        <div className='w-full max-w-3xl flex flex-col items-center'>
            <h2 className='my-7 mt-14 flex gap-2 text-center'>Not sure where to start?<strong>See here how it works</strong><ArrowDown/></h2>
            <HeroVideoDialog
            className="block dark:hidden w-full max-w-3xl"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
        />
        </div>
    </div>
  )
}

export default Hero