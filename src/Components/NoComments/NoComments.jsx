import React from 'react'
import { IoDocumentTextSharp } from "react-icons/io5";
export default function NoComments() {
  return<>
  <div className='h-[300px] flex justify-center items-center'>
    <div>
      <div className='flex justify-center'>
        <IoDocumentTextSharp className='text-gray-400' size={80} />
      </div>
        
        <p className='font-bold text-gray-500 text-center text-[20px]'>No comments yet</p>
        <p className='text-gray-400 text-center text-[14px]'>Be the first to comment.</p>
    </div>
    

  </div>
  </>
}
