import { Button } from '@/components/ui/button'
import { Globe2, Landmark, Plane } from 'lucide-react'
import { div } from 'motion/react-client'
import React from 'react'

const suggestions=[{title:'Create New Trip',icon:<Globe2 className='text-blue-400 h-5 w-5'></Globe2>},
    {title:'Adventure destination',icon:<Globe2 className='text-yellow-400 h-5 w-5'></Globe2>},
    {title:'Inspire me where to go',icon:<Plane className='text-green-400 h-5 w-5'></Plane>},
    {title:'Discover hidden gems',icon:<Landmark className='text-orange-400 h-5 w-5'></Landmark>}
]



const EmptyState = ({onSuggestionClick}:any) => {



  return (
    <div className='flex flex-col'>
        <div className='mt-5'>
            <h1 className='md:text-3xl font-bold text-center'>Start Planning new <span className='text-primary'>Trip</span> using AI</h1>
            <p className='text-center text-gray-400 mt-2'>Discover personalizede travel itenaries,find the best destination and plan you dream vacation effectively
                with power of AI.Let our smart assistant do the hardwork while you enjoy the journey.
            </p>
        </div>
        <div className='p-5'>
          {suggestions.map((suggestion,index)=>{
            return(
              <div onClick={()=>onSuggestionClick(suggestion.title)}className='flex items-center border rounded-xl cursor-pointer hover:border-primary hover:text-primary gap-5 p-5'>{suggestion.icon}
                <h2>{suggestion.title}</h2></div>
   
            )
          })}
        </div>

    </div>
  )
}

export default EmptyState