"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import  {Loader2, Send } from 'lucide-react'
import axios from 'axios'
import EmptyState from './EmptyState'

type Message={
    role:string,
    content:string
}

const Chatbox = () => {

    const [messages,setMessages]=useState<Message[]>([])
    const [userInput,setUserInput]=useState<string>('')
    const [loading,setLoading]=useState(false)


    async function onSend(customInput?:string)
    {
        const content=customInput??userInput
        setLoading(true)
        setUserInput('')
        const newMessage:Message={
            role:'user',
            content,
        }

        setMessages((prev:Message[])=>[...prev,newMessage])

       const result= await axios.post('api/aimodel',{
        messages:[...messages,newMessage]
       })
        setMessages((prev:Message[])=>([...prev,{
            role:'system',
            content:result?.data?.resp
        }]))
        console.log(result.data)
        setLoading(false)
    }

  return (
    <div className='h-[85vh] flex flex-col'>
        {messages?.length==0&&<EmptyState onSuggestionClick={(v:string)=>{setUserInput(v);onSend(v)}}/>}
        <section className='flex-1 overflow-y-auto p-4'>
            
            {messages.map((mssg:Message,index)=>{
                return(
                     mssg.role=='user'?(
                        <div className='flex justify-end mt-2' key={index}>
                            <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                                {mssg.content}
                            </div>
                        </div>
                     ):(

                       <div className='flex justify-start mt-2' key={index}>
                            <div className='max-w-lg bg-gray-300 text-black px-4 py-2 rounded-lg'>
                                {mssg.content}
                            </div>
                        </div>
                     )

                )
            })}

            {
                loading&&<div className='flex justify-start mt-2'>
                            <div className='max-w-lg bg-gray-300 text-black px-4 py-2 rounded-lg'>
                                {<Loader2 className='aniamte-spin'/>}
                            </div>
                        </div>
            }

            
            
           
        </section>
        <section className='w-full max-w-3xl relative p-5'>
            
                <Textarea className='h-28 bg-transparent' placeholder='Input message...' onChange={(event)=>setUserInput(event.target.value)} value={userInput}/>
                <Button onClick={()=>onSend(userInput)}size={'icon'} className='absolute bottom-6 right-6'>
                    <Send className='h-4 w-4'></Send>
                </Button>
            
        </section>
    </div>
  )
}

export default Chatbox