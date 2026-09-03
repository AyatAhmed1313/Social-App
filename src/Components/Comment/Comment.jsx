import { AuthContext } from '@/Contexts/AuthContext'
import { headerObject } from '@/headerObject/headerObject.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'

export default function Comment({comment,setComment,activePostId}) {
    const {_id:commentId,content,createdAt,commentCreator}=comment
    const {name,photo,_id:creatorId}=commentCreator
    const {userData}=useContext(AuthContext)
    const {id:userId}=userData
    const queryClient=useQueryClient()
    const {mutate}=useMutation({
        mutationFn:deleteComment,
        onSuccess:()=>{
            queryClient.invalidateQueries(['comments',activePostId])
            toast.success('comment deleted sucessfully')
        },
        onError:()=>{
            toast.error("something went wrong")
        }
    })
    async function deleteComment(){
        try {
             const {data}=await axios.delete(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${commentId}`,headerObject)
             console.log("deleted Comment ",data)
        } catch (error) {
            console.log(error)
        }
     

    }
  return <>
   {/* img creator ,creator name, date */}
   <div className="flex mb-[20px] gap-3">
    <img src={photo} className='size-[40px] rounded-full' alt={name} />
   <div className='w-full rounded-[10px] bg-gray-200 p-3'>
    <div className="flex gap-2 items-center">
        <p className='font-semibold'>{name}</p>
    <span className='opacity-65 text-sm'>{createdAt.split("T")[0]}</span>
    </div>
    
    <div className="flex gap-3 justify-between items-center">
        <p>{content}</p>
    <div className='flex gap-3'>
        {userId==creatorId&&<>
                <button onClick={()=>setComment(comment)} className='text-sm font-semibold text-white py-1 px-2 bg-amber-600 cursor-pointer rounded-[10px]'>Update</button>
                <button onClick={mutate} className='text-sm font-[600] py-1 px-2 bg-red-500 cursor-pointer rounded-[10px]'>Delete</button>
        </>}
    </div>
    
    </div>
   </div>
   </div>
   
   {/* content */}
   {/* update ,delete btn */}
  </>
}

