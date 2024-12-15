import { Badge } from "@/components/ui/badge"
import React from 'react'


function LatestJobCards() {

  
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-medium text-lg'>Frontend Developer</h1>
        <p className='text-sm'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg'>Company Name</h1>
        <p className='text-sm text-gray-600'>email</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
          <Badge className={'text-blue-700 font-bold'} variant="ghost" >medium</Badge>
          <Badge className={'text-[#F83002] font-bold'}variant="ghost">position</Badge>
          <Badge className={'text-[#7209b7] font-bold'} variant="ghost">salary</Badge>
      </div>
      
    </div>
  )
}

export default LatestJobCards