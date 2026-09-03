import { headerObject } from '@/headerObject/headerObject.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaImage } from "react-icons/fa";
import { AuthContext } from '@/Contexts/AuthContext'
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
// import { useRef } from "react";

export default function AddPostCard({setTextInput,textInput,postWillUpdated,setPostUpdated,scrollPosition}){
  
    // const scrollPosition= useRef(0);
   
  
const {userData}=useContext(AuthContext)
// const navigate=useNavigate()
 const {photo,name}=userData ||{}
 const [text,setText]=useState('')
//  const [showCard,setShowCard]=useState(true)
// const [openCard,setOpenCard]=useState(false)
 function getFontSize(){
    if (text.length < 50) return "28px";
    if (text.length < 100) return "20px";
    if (text.length < 140) return "18px";
    return "16px";
 }
  const addPostSchema=z.object({
     body: z.string().min(1, 'ُEnter at least one character. If you don\'t want to write any text, enter a space'),
     image: z.any().optional()
   });
  const {register,handleSubmit,formState,watch,setValue}=useForm({
        mode:'onSubmit',
        reValidateMode:'onChange',
        resolver: zodResolver(addPostSchema),
        defaultValues:{
            body:'',
            image:null,
        }
        
    })
    //~=====================================================>
      
  if (postWillUpdated) {
    setValue('body', postWillUpdated.body);
    // setValue('image', postWillUpdated.image);
    console.log("body is: ",postWillUpdated.body)
  console.log("image is: ",postWillUpdated.image)
  }

//     if(postWillUpdated){
//          ({body:postText,id:postId,image:postImg}=postWillUpdated)
//           setValue('body', postWillUpdated.body);
//           setValue('image', postWillUpdated.image);
//     }
//       console.log("body is: ",postText)
//   console.log("image is: ",postImg)

  //~=====================================================>


    const image = watch('image');
    if(image){
        console.log(image)
    }
    const queryClient=useQueryClient()
    const {mutate,isPending}=useMutation({
        
        mutationFn:postWillUpdated?updatePost:addPost,
        onSuccess:()=>{
            queryClient.invalidateQueries(['posts'])
            queryClient.invalidateQueries(['userPosts'])
            postWillUpdated?toast.success('post updated successfully'):toast.success('post created successfully')
            postWillUpdated? window.scrollTo({
                top: scrollPosition.current,
                behavior: "instant",
                }):null
            setTextInput(false)
            setPostUpdated(null)
            // navigate('/posts')

        },
        onError:()=>{
            toast.error("something went wrong")
        }
    })
    async function addPost(values){
        console.log(values,"from addPost FUnc!!!!!!!!!!!!!!!")
        const formData=new FormData()
        formData.append('body',values.body)
        if(values.image?.[0]){
            console.log("image is",values.image[0])
            formData.append('image',values.image[0])
        }
   
        try{
            const {data}=await axios.post('https://route-posts.routemisr.com/posts',formData,headerObject)
            // console.log(response,'Response from addPost func')
            return data
        }catch(err){
            console.log(err,"from addPost func")
            // return err
    }
        
    }
   async function updatePost(values){
    let dataWillSent=new FormData()
    dataWillSent.append("body",values.body)
    if(values.image){
        dataWillSent.append('image',values.image[0])
    }
    

    try {
        // console.log(postWillUpdated.id)
        const {data}=await axios.put(`https://route-posts.routemisr.com/posts/${postWillUpdated.id}`,dataWillSent,headerObject)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
   }
 
  return <>
    {(textInput ||postWillUpdated)&& <form onSubmit={handleSubmit(mutate)} className='py-4 px-4 rounded-[10px] border-1 bg-white'>
        <div className='w-[100%] h-[100vh] absolute top-0 left-0 z-11 bg-slate-300/60 flex justify-center items-center'>
        {/* card */}
        <div className='w-[50%] min-h-[400px] max-h-[100vh] bg-white shadow-[12px_12px_48px_rgba(0,0,0,0.25)] rounded-xl'>
            {/* card header */}
            <div className='border-b border-solid border-slate-200 relative py-[20px] px-[25px]'>
                <h2 className='text-center font-bold'>Create Post</h2>
                <div className='absolute z-1 top-[10px] right-[15px]'>
                    <IoIosCloseCircle onClick={()=>{
                        setTextInput(false)
                        setPostUpdated(null)
                    }
                    } size={40} className='text-slate-300'/>
                </div>

            </div>
            <div className='p-3'>
                {/* userimg,name */}
                <div className='flex gap-3 mb-[20px]'>
                    <img className='size-[40px] rounded-full' src={photo} alt={name} />
                    <p>{name}</p>

                </div>
                {/* content */}
                <textarea {...register('body')} className='w-full min-h-[200px] border-0 border-white box-shadow-0 focus:border-0 focus:outline-none focus:outline-offset-0 focus:box-shadow-0 focus:ring-0 focus:ring-transparent' style={{fontSize:getFontSize()}}></textarea>
                 {formState.errors.body && (
                  <p className="text-red-500 p-1 pl-[10px]">
                    {formState.errors.body.message}
                  </p>
                )}
               
               {postWillUpdated &&<img src={postWillUpdated.image} className='mb-[20px] h-[250px]'/>}
                <input {...register('image')} id='postImage' type="file" className='pb-[8px]'/>
                    {/* <label {...register('image')} htmlFor='postImage' className='w-[100%] h-[60px] bg-gray-200 mb-[10px] flex justify-center items-center gap-3'> */}

                        {/* <p>Choose Image</p> */}
                        {/* <FaImage size={40} className='cursor-pointer text-slate-500'/> */}
                    {/* </label> */}
                {!postWillUpdated?
                <button type='submit'className='bg-blue-500 text-white py-2 px-3 rounded-xl cursor-pointer'>{isPending?'adding...':'add post'}</button>:
                <button type='submit' className='bg-amber-400 py-2 px-3 rounded-xl cursor-pointer'>update</button>
                }
            </div>

        </div>
    </div>

    </form>
                
  
  }
 </>
            
}
