"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import  {Send } from 'lucide-react'
import axios from 'axios'

type Message={
    role:string,
    content:string
}

const Chatbox = () => {

    const [messages,setMessages]=useState<Message[]>([])
    const [userInput,setUserInput]=useState<string>('')
    async function onSend()
    {
        setUserInput('')
        const newMessage:Message={
            role:'user',
            content:userInput,
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
    }

  return (
    <div className='h-[85vh] flex flex-col'>
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
            
            
           
        </section>
        <section className='w-full max-w-3xl relative p-5'>
            
                <Textarea className='h-28 bg-transparent' placeholder='Input message...' onChange={(event)=>setUserInput(event.target.value)} value={userInput}/>
                <Button onClick={onSend}size={'icon'} className='absolute bottom-6 right-6'>
                    <Send className='h-4 w-4'></Send>
                </Button>
            
        </section>
    </div>
  )
}

export default Chatbox