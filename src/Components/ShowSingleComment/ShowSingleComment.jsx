import React from 'react'
import {formatDistanceToNow} from 'date-fns'
export default function ShowSingleComment(props) {
    // console.log(props,'from show single comment')
    console.log(props.topComment,'topcomment object from single comment')
   
    const {commentCreator,content:commentContent,createdAt,repliesCount}=props.topComment ||{}
    
   
    console.log(repliesCount,"\n(Replies Count Value)")
    // console.log(props,'from show single comment')
   const {photo:commentCreaterPhoto,name:commentCreaterName} =commentCreator||{}
   const result =createdAt? formatDistanceToNow(
      
        new Date(createdAt&&createdAt),
       {addSuffix: true}
     
       ):null
  return<>
  {props.topComment && commentCreator&&
  <div className="bg-white p-2 rounded-xl mt-[15px]">
    <div className='flex gap-3 items-center'>
    <img className='size-12 rounded-full object-contain' src={commentCreaterPhoto} alt={commentCreaterName}/>
    <div>
      <div className='flex gap-3'>
        <p className='font-bold'>{commentCreaterName}</p>
        <p className='text-sm text-slate-500'>{result}</p>
    </div>
    <div>
       {commentContent}
    </div>  
    </div>
    
  </div>
  {/* <div className='w-full bg-white p-3'>
    
  </div> */}
  </div>
  }
  
 

  </>
}
