import PostCard from '@/Components/Card/PostCard'
import {CommentsWrapper} from '@/Components/CommentsWrapper/CommentsWrapper'
import LoadingSkeletonPostCard from '@/Components/LoadingSkeleton/LoadingSkeletonPostCard'
import usePosts from '@/CustomHook/usePosts'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetails() {
  const [isOpen, setIsOpen] = useState(false);
   const postId=useParams()
   const {id}=postId
   console.log(id,'id from post dtails')
    const {data,isLoading,isFetching,isFetched,isError}=usePosts(['Post',id],true,`/posts/${id}`)
    if(data){
        console.log(data,`\npost detail\nfrom post Details`)
    }
  return <>
  <div className='container min-h-[100vh] flex items-center justify-center'>
    <div className='w-full'>
      <title>Post details</title>
    {/* <div className="container"> */}
        {isLoading&&<LoadingSkeletonPostCard/>}
        {isFetched&&<PostCard post={data.data.post} setIsOpen={setIsOpen}/>}
    {/* </div> */}
    </div>
    
  </div>
   
  </>
}
