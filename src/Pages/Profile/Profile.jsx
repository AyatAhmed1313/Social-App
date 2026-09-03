import PostCard from "@/Components/Card/PostCard"
import {CommentsWrapper} from "@/Components/CommentsWrapper/CommentsWrapper"
import LoadingSkeletonPostCard from "@/Components/LoadingSkeleton/LoadingSkeletonPostCard"
import PostAddForm from "@/Components/PostAddForm/PostAddForm"
import { AuthContext } from "@/Contexts/AuthContext"
import usePosts from "@/CustomHook/usePosts"
import { useContext, useState} from "react"
import { useRef } from "react";
// import { CommentsWrapper } from '@/Components/CommentsWrapper/CommentsWrapper';

export default function Profile() {
const [isOpen, setIsOpen] = useState(false);
const {userData} =useContext(AuthContext)
const scrollPosition = useRef(0);
console.log(userData)
console.log(userData?._id,'from profile')
const [activePostId,setActivePostId]=useState()
const {data,isLoading,isFetched}=usePosts(['userPosts'],Boolean(userData?._id),`users/${userData?._id}/posts`)
let [postWillUpdated,setPostUpdated]=useState()
  if(data){
    console.log(data,'\nfrom profile')
  }

  return <>
  <title>Profile</title>
  <div className="relative bg-slate-100">
    <div className="relative pt-[70px]">
      <PostAddForm scrollPosition={scrollPosition} postWillUpdated={postWillUpdated} setPostUpdated={setPostUpdated}/>
  </div>
  
  <div className='px-[10px] sm:px-[20px] lg:px-[40px] pt-[70px]'>
    
    {isLoading ||userData==undefined &&<LoadingSkeletonPostCard/>}
    {isFetched &&data.data.posts.map((userPost)=><PostCard setPostUpdated={setPostUpdated} setActivePostId={setActivePostId} setIsOpen={setIsOpen} key={userPost._id} post={userPost} setIsOpen={setIsOpen} />)}
  
  </div>
  <CommentsWrapper activePostId={activePostId} isOpen={isOpen} setIsOpen={setIsOpen}/>
  </div>
  
  </>
}
