import React, { useState } from 'react'
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
// import { useState } from "react";
import axios from 'axios';
import { headerObject } from '@/headerObject/headerObject.js';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import Comment from '../Comment/Comment';
import AddComment from '../AddComment/AddComment';
// import { get } from 'react-hook-form';



export function CommentsWrapper({isOpen,setIsOpen,activePostId}){
  const [commentToBeUpdated,setComment]=useState()
  const {data,isFetched,isLoading}=useQuery({
    queryFn:getPostComments,
    queryKey:['comments',activePostId],
    enabled:Boolean(activePostId)
  })
  
  async function getPostComments(){
    try {
      const {data}= await axios.get(`https://route-posts.routemisr.com/posts/${activePostId}/comments?page=1&limit=10`,headerObject)
      console.log("post Comments are: ",data)
      return data
    } catch (error) {
      console.log(error)
    }
    
  }
  // getPostComments()



  const handleClose = () => setIsOpen(false);

  return (
    <>
      
      <Drawer className='h-[60vh]' open={isOpen} onClose={handleClose} position="bottom">
        <DrawerHeader title="Comments" />
        <DrawerItems className='h-full'>
          
          {isLoading&&<Skeleton count={6} className='w-[100%] h-[40px]' baseColor='#343137'></Skeleton>}
          {isFetched &&data.data.comments.map((comment)=><Comment key={comment._id} activePostId={activePostId} setComment={setComment} comment={comment}/>)}
           <AddComment commentToBeUpdated={commentToBeUpdated} activePostId={activePostId}/>

          
          
        </DrawerItems>
      </Drawer>
    </>
  );
}
