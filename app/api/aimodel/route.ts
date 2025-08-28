import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import Groq from "groq-sdk"


export const groq=new Groq({
    apiKey:process.env.GROQ_API_KEY,
     
})

const PROMPT=`You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

 Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

1. Starting location (source) 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final) , where Final means AI generating complete final outpur
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:

Always return JSON in this exact format:
{
  "resp": "the conversational text only, do not include UI here",
  "ui": "one of: startingLocation | destination | groupSize | budget | tripDuration | travelInterests | specialRequirements | Final   this should be based on the context of the above resp field "
}
`
export async function POST(req:NextRequest)
{
    const {messages}=await req.json()
   
   try 
   {
        const completion=await groq.chat.completions.create({
        model: "moonshotai/kimi-k2-instruct",
        response_format:{type:'json_schema',
            json_schema:{
                name:"trip-planner-reposne",
                strict:true,
                schema:{
                    type:"object",
                    properties:{

                        resp:{
                            type:"string",
                        description:"Only the response"
                        },
                        ui:{
                            type:"string",
                            enum:[
                                 "startingLocation",
                                "destination",
                                "groupSize",
                                "budget",
                                "tripDuration",
                                "travelInterests",
                                "specialRequirements",
                                "Final"
                            ]
                        }   
                    },
                    required: ["resp", "ui"],
                    additionalProperties:false
                }
            }
        },
        messages:[
            {
                "role":'system',
                "content":PROMPT,
            },
            ...messages
        ]
    })
    console.log(completion.choices[0]?.message?.content||"")
    const response=completion.choices[0].message

    console.log('hello')
    let parsed = JSON.parse(response.content ?? '{}');
    
    return NextResponse.json(parsed);

    
   } catch (error) {
    console.error(error)
     return NextResponse.json(error);
   }
   
    
}