import { headerObject } from '@/headerObject/headerObject.js';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
// import ChangePassword from './ChangePassword';

export default function ChangePassword() {
  const navigate=useNavigate()
  let [showEye,setShowEye]=useState(false)
  let [showNewPasswEye,setShowNewPasswEye]=useState(false)
  let [showLoading,setShowLoading]=useState(false)
    const changePasswordSchema = z.object({
       password: z
          .string()
          .min(1, "Password Is Required")
          .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
          ),
          newPassword:z
          .string()
          .min(1, "New Password Is Required")
          .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
          ),
      });
  const {register ,handleSubmit,formState,reset}=useForm({
    resolver: zodResolver(changePasswordSchema),
        defaultValues:{
        password: "",
        newPassword: ""
        }
    })

 const {mutate}=useMutation({
        mutationFn:changePassword,
        onSuccess:()=>{
          setTimeout(()=>{
            toast.success('Password Changed Successfully')
            reset()
            navigate('/')
            
          },2000)
           
            localStorage.removeItem('token')
           
        },
        onError:(error)=>{
            toast.error('Old Password Not Correct')
        }
    })
    async function changePassword(values){
        console.log(values)
        try {
            setShowLoading(true)
            const {data}=await axios.patch(`https://route-posts.routemisr.com/users/change-password`,values,headerObject)
            console.log(data)
            setShowLoading(false)
            return data
            
        }catch (error) {
            console.log('error: ',error.response.data.message)
            throw error
        }

    }
 return<>
 <div className="bg-slate-100">
    <form onSubmit={handleSubmit(mutate)} className='mt-[80px] w-[60%] mx-auto rounded-2xl bg-white px-4 py-8'>
    <div className="relative flex gap-3 mb-[20px] items-center">
    <label htmlFor="old_password" className='w-[120px]'>Old Password</label>
    <input {...register('password')} id={'old_password'} type={`${showEye?'text':'password'}`} className='grow border-0 bg-slate-100 rounded-[10px] outline-0 ring-0' />
    {!showEye&&<FaEyeSlash onClick={()=>setShowEye(true)} className='absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer text-[18px]'/>}
    {showEye && <FaEye onClick={()=>setShowEye(false)} className='absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer text-[18px]'/>}
    </div>
    {/* Show password Error */}
     {formState.errors.password && (
                  <p className="text-red-600 p-1 pl-[10px] text-sm mb-[20px]">
                    {formState.errors.password.message}
                  </p>
                )}
  <div className="relative flex gap-3 items-center">
    <label htmlFor="new_password" className='w-[120px]'>New Password</label>
    <input {...register('newPassword')} id={'new_password'} type={`${showNewPasswEye?'text':'password'}`} className='outline-0 ring-0 grow border-0 bg-slate-100 rounded-[10px]' />
    {!showNewPasswEye&&<FaEyeSlash onClick={()=>setShowNewPasswEye(true)} className='absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer text-[18px]'/>}
    {showNewPasswEye&&<FaEye onClick={()=>setShowNewPasswEye(false)} className='absolute top-[50%] right-4 translate-y-[-50%] cursor-pointer text-[18px]'/>}
  </div>
  {/* Show new password Error */}
   {formState.errors.newPassword && (
                  <p className="text-red-600 p-1 pl-[10px] text-sm mb-[20px]">
                    {formState.errors.newPassword.message}
                  </p>
                )}

    <button type='submit' className='my-[20px] bg-blue-500 w-fit h-fit py-3 px-4 rounded-[15px] text-white'>{showLoading?<AiOutlineLoading3Quarters className='animate-spin' /> :'change password'}</button>
 </form>
 </div>
 

  
 </>
}
