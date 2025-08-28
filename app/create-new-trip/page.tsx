import React from 'react'
import Chatbox from './_components/Chatbox'
const CreateNewTrip = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-10'>
      <div>
        <Chatbox></Chatbox>
      </div>

      <div>
        Map and trip plan to display
      </div>
    </div>
  )
}

export default CreateNewTrip