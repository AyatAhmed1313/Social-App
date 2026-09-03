import { headerObject } from '@/headerObject/headerObject.js'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext=createContext()



export default function AuthContextProvider({children}) {
    const [token,setToken]=useState(localStorage.getItem('token'))
    console.log(token,"from authcontext")
    const [userData,setUserData]=useState()
    // console.log(token,'from AuthContext')
    console.log(userData,'from AuthContext')

    async function userProfileData(){
        try{
            if(localStorage.getItem('token')){
             const {data}=await axios.get('https://route-posts.routemisr.com/users/profile-data',headerObject)
             console.log(data,'user Proile Data from AuthContext')
             setUserData(data.data.user)
            }
          
}catch(err){
    console.log(err)
}
    

}
useEffect(()=>{
    userProfileData()
},[])
  return <AuthContext.Provider value={{token,setToken,userData}}>
     {children}
  </AuthContext.Provider>

}
