import { AuthContext } from '@/Contexts/AuthContext'
import { headerObject } from '@/headerObject/headerObject.js'
// const headerObject={
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`
//       }}
// import { headerObject } from '@/headerObject/headerObject'
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// usePosts(queryKey,enabled,endPoint)['posts']
export default function usePosts(queryKey,enabled,endPoint) {
    const navigate=useNavigate()
    console.log('header object from use posts: ',headerObject)
  const {data,isLoading,isFetching,isFetched,isError}=useQuery({
    queryFn:getPosts,
    queryKey:[...queryKey],
    enabled:enabled,
 
   
  })

  async function getPosts(){
    try{
    const {data}=await axios.get(`https://route-posts.routemisr.com/${endPoint}`,headerObject)
    console.log(`${queryKey[0]} from usePosts????`,data)
    return data
    
  }catch(err){
    console.log(err.response)
    if(err.response.data.message=="jwt expired"){
        localStorage.removeItem('token')
        console.log('token deleted from local storage')
        navigate('/')
    }else{
        return err
    }
    
  }
    
  }

  return {data,isLoading,isFetching,isFetched,isError}
}
