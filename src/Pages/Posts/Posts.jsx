import PostCard from '@/Components/Card/PostCard'
import LoadingSkeletonPostCard from '@/Components/LoadingSkeleton/LoadingSkeletonPostCard'
import PostAddForm from '@/Components/PostAddForm/PostAddForm'

import usePosts from '@/CustomHook/usePosts'
import { useEffect, useState } from 'react'
import { CommentsWrapper } from '@/Components/CommentsWrapper/CommentsWrapper';
import { useRef } from "react";
import { showToken } from '@/headerObject/headerObject.js'
// import { showToken } from '@/headerObject/headerObject'


export default function Posts() {
 const [isOpen, setIsOpen] = useState(false);
 showToken()
 const {data,isLoading,isFetching,isFetched,isError}=usePosts(['posts'],true,'posts')
 const [activePostId,setActivePostId]=useState()
 let [postWillUpdated,setPostUpdated]=useState()
 const scrollPosition = useRef(0);
 console.log("POSTS RENDER");

 useEffect(() => {
  console.log("SCROLL EFFECT CREATED");
  const handleScroll = () => {
    scrollPosition.current = window.scrollY;
    console.log('current scroll position:', scrollPosition.current);
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    console.log("SCROLL EFFECT CLEANED");
  };
}, []);
  return <>

    <title>Posts</title>
    
    
  <div className="relative px-[10px] sm:px-[20px] lg:px-[40px] pt-[70px] bg-slate-100">
    <PostAddForm postWillUpdated={postWillUpdated} setPostUpdated={setPostUpdated}  scrollPosition={scrollPosition}/>
    {/* <TokenShow/> */}
    {isLoading&&<LoadingSkeletonPostCard/>}
    {isFetched&&data?.data?.posts.map((post)=><PostCard setPostUpdated={setPostUpdated} setActivePostId={setActivePostId} setIsOpen={setIsOpen} key={post.id} post={post}/>)}
  </div>
  <CommentsWrapper isOpen={isOpen} activePostId={activePostId} setIsOpen={setIsOpen}/>
 
  
  
 
  
  </>
}
