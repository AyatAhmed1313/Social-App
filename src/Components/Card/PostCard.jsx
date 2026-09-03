import React, { useContext, useEffect, useState } from 'react'
import { FaCommentAlt, FaInfoCircle, FaRegComment } from 'react-icons/fa'
import { FcLike } from "react-icons/fc";
import {formatDistanceToNow} from 'date-fns'
import { Link } from 'react-router-dom';
import ShowSingleComment from '../ShowSingleComment/ShowSingleComment';
import usePosts from '@/CustomHook/usePosts';
import { AuthContext } from '@/Contexts/AuthContext';
import axios  from 'axios';
import { headerObject } from '@/headerObject/headerObject.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {CommentsWrapper} from '../CommentsWrapper/CommentsWrapper';
import { AiOutlineLike } from 'react-icons/ai';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { QueryClient, useMutation ,useQueryClient} from "@tanstack/react-query";
export default function PostCard({post,setIsOpen,setActivePostId,setPostUpdated}) {
    // const [commentIconClicked,setCommentIconClicked]=useState(false)
    // console.log(post,'post data from card post')
    let [clickedPostId,setPostId]=useState(null)
    const {createdAt:postDate,body:postText,id:postId,image:postImg}=post
    // console.log('Post Id from postCard :',postId)
    const {name,photo:userImage,_id:userId}=post.user
    const {userData}=useContext(AuthContext)
    const queryClient=useQueryClient()
    console.log(userData,"fRoooooooom Post Card")
    let id;
    if(userData){
         ({id}=userData)
    }
    
    // console.log('post Id : ',postId)
    
    console.log(userData,"\nuserData from PostCard")
    // const {data,isLoading,isFetched,isFetching,isError}=usePosts(['allComments'],true,`posts/${postId}/comments?page=1&limit=10`)
    const result = formatDistanceToNow(
    new Date(postDate),
    {addSuffix: true}
    )
     function handleChatBubble(){
        if(clickedPostId==null){
            setPostId(postId)
        }else{
            setPostId(null)
        }
     }
   
const {mutate,isPending} = useMutation({
    mutationFn:deletePost,
    onSuccess:()=>{
        
        queryClient.invalidateQueries(['posts'])
        queryClient.invalidateQueries(['userPosts'])
        // alert("post deleted successfully")
        toast.success('Post deleted successfully')
        setPostId(null)

    },
    onError:()=>{
        toast.error("Error! Something Went Wrong")  
    }
   })
async function deletePost(){
    // console.log('delete post')
    try{
        const response=await axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,headerObject)
        console.log(response) 
       
    }catch(err){
        console.log(err.response)
        throw err
    //    toast.error("Error! Something Went Wrong") 
        
    }
}

 function handleComment(){
    setIsOpen(true)
        setActivePostId(postId)
    }
  return<>
 
  
   <div className="mt-[30px] p-[20px] bg-white shadow-sm block w-full border border-default rounded-base shadow-xs">
    <div className="flex justify-between mb-[20px]">
     {/* header createrImage ,creatername,date,delete btn */}
    <div className='flex gap-3'>
        <img className='w-[50px] h-[50px] rounded-full' src={userImage} alt="creater Image" />
    <div className=''>
     <p>{name}</p>
     <p>{result}</p>
    </div>
      </div>
    <div className='relative'>
        {userId==id &&<HiOutlineDotsHorizontal onClick={handleChatBubble} />
       }
    <div id="dropdownDots"  className={`${clickedPostId==postId?'':'hidden'} absolute top-[20px] left-[-150px]  z-1 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-40 block`}>
  <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownMenuIconButton">
    <li>
      <a href="#" onClick={()=>setPostUpdated(post)} className="cursor-pointer block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md">Edit</a>
    </li>
    <li>
      <a href="#" onClick={mutate} className="cursor-pointer block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md">Delete</a>
    </li>
  </ul>
</div>
    </div>
    
  
    

     
    {/*  <button onClick={mutate} className='cursor-pointer font-semibold !bg-red-500 rounded-xl px-[20px] py-[8px]'>
        {isPending?"Deleting...":"Delete"}  </button>*/}
    </div>

    {/* body postText */}
    <div className='my-[30px]'>
        {postText}
    </div>
    {/* post image */}
    <div className='mb-[20px]'>
       {postImg&&<img className='h-[400px] object-cover' src={postImg} alt="" />} 
    </div>
 
   <div className='flex justify-between text-slate-300 mb-[30px]'>
    <AiOutlineLike size={'20'} className='cursor-pointer text-slate-500' />
    <FaRegComment size={'20'} onClick={handleComment} className='cursor-pointer text-slate-500' />
    <Link to={`/postdetails/${postId}`}>
    <FaInfoCircle className='cursor-pointer text-slate-500' size={'20'}/> 
   </Link>
   </div>
   {/* {commentIconClicked&&<CommentsWrapper postId={postId} setCommentIconClicked={setCommentIconClicked}/>} */}
 </div>
 
  
  



  
  
  
  </>
}
