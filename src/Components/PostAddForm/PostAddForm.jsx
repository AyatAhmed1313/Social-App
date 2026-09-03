import { AuthContext } from '@/Contexts/AuthContext';
// import { headerObject } from '@/headerObject/headerObject';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
import React, { useContext, useState } from 'react'
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
import { FaImage } from "react-icons/fa";
import AddPostCard from '../AddPostCard/AddPostCard';
// import { type } from './../../../node_modules/react-hot-toast/src/core/store';
export default function PostAddForm({postWillUpdated,setPostUpdated,scrollPosition}){
    let [textInput,setTextInput]=useState(false)
    const {userData}=useContext(AuthContext)
    const {photo,name}=userData ||{}
    // const {register,handleSubmit}=useForm({
    //     body:'',
    //     image:null
    // })
    // const queryClient=useQueryClient()
    // const {mutate,isPending}=useMutation({
    //     mutationFn:addPost,
    //     onSuccess:()=>{
    //         queryClient.invalidateQueries(['posts'])
    //         queryClient.invalidateQueries(['userPosts'])
    //         toast.success('post created successfully')
    //     },
    //     onError:()=>{
    //         toast.error("something went wrong")
    //     }
    // })
    // async function addPost(values){
    //     console.log(values,"from addPost FUnc!!!!!!!!!!!!!!!")
    //     const formData=new FormData()
    //     formData.append('body',values.body)
    //     if(values.image[0]){
    //         console.log("BDRTSWEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    //         formData.append('image',values.image[0])
    //     }
        
    //     console.log("Creating post Values ",values)
    //     try{
    //         const {data}=await axios.post('https://route-posts.routemisr.com/posts',formData,headerObject)
    //         // console.log(response,'Response from addPost func')
    //         return data
    //     }catch(err){
    //         console.log(err,"from addPost func")
    //         return err
    //     }
        
    // }
  return <>
  {userData&& <div>
        <div className='py-4 px-4 rounded-[10px] border-1 bg-white'>
    <div className='flex gap-3'>
        <img src={photo} alt={name} className='size-[40px] rounded-full' />
        <input type='text'onClick={()=>setTextInput(true)} className='w-full p-3 rounded-full bg-slate-100 border-0 h-fit w-[90%]' placeholder={`What's on your mind, ${name&&name.split(' ')[0]}?`}/>
         <input id='postImage' type="file" className='pb-[8px] hidden'/>
        <label htmlFor='postImage' className='w-[5%] mb-[10px] flex justify-center items-center gap-3'>
            {/* <p>Choose Image</p> */}
            <FaImage size={40} className='cursor-pointer text-slate-500'/>
        </label>
    </div>
    {/* <p className='text-gray-500'>Add post here</p> */}
    
   
    {/* <button className='py-2  px-3 rounded-xl bg-blue-500 text-white cursor-pointer'>{isPending?'adding...':'add post'}</button> */}
  </div>
  {(textInput || postWillUpdated) && <AddPostCard scrollPosition={scrollPosition} postWillUpdated={postWillUpdated} setPostUpdated={setPostUpdated} textInput={textInput} setTextInput={setTextInput}/>}
  </div>}
 

  </>
}
