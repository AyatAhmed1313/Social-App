import { headerObject } from '@/headerObject/headerObject.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AddComment({activePostId,commentToBeUpdated}) {
  const {register,handleSubmit,reset,setValue,getValues}=useForm({
    defaultValues:{
      content:''
    }
  })
  const queryClient=useQueryClient()
  const {mutate}=useMutation({
    mutationFn:addComment,
    onSuccess:()=>{
      
      queryClient.invalidateQueries(['comments',activePostId])
      toast.success('comment added successfully')
      reset()

    },
    onError:()=>{
     toast.error('somthing went wrong')
    }
  })

    const {mutate:updateCommentMutate}=useMutation({
    mutationFn:updateComment,
    onSuccess:()=>{
      
      queryClient.invalidateQueries(['comments',activePostId])
      toast.success('comment updated successfully')
      reset()

    },
    onError:()=>{
     toast.error('somthing went wrong')
    }
  })
 async function addComment(values){
     console.log(values)
     try {
       const {data}=await axios.post(`https://route-posts.routemisr.com/posts/${activePostId}/comments`,values,headerObject)
       return data
       console.log(data)
     } catch (error) {
      console.log(error)
      return error
     }
  }
useEffect(() => {
  if (commentToBeUpdated) {
    setValue("content", commentToBeUpdated.content);
  }
}, [commentToBeUpdated, setValue]);

  async function updateComment(){
    try {
      const dataToBeSend={content:getValues('content')}
      const {data}= await axios.put(`https://route-posts.routemisr.com/posts/${activePostId}/comments/${commentToBeUpdated._id}`,dataToBeSend,headerObject)
      console.log("updated comment",data)
      

    } catch (error) {
      console.log(error)
    }
   
  }

  return <>
   <form onSubmit={handleSubmit(mutate)} className='bg-slate-200 p-6 rounded-[20px]'>
   <textarea {...register('content')} className='border-0 w-[100%] min-h-[50px] focus:outline-0 focus:ring-transparent focus:border-0 focus:ring-0 bg-slate-100 rounded-[20px]' placeholder='write a comment ...'></textarea>
   <button type='submit' className='mb-[10px] p-2 w-full bg-blue-500 rounded-[10px] text-white cursor-pointer'>add comment</button>
   <button type='button' onClick={updateCommentMutate} className='p-2 w-full bg-gray-700 rounded-[10px] text-white cursor-pointer'>Update</button>
   </form>
  
  </>
   
  
}
