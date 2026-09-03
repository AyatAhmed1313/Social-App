 import {z} from 'zod'


 export const RegisterationSchema=z.object({
      name: z.string().min(1,'name is required').min(3,"Min Chars Is 3").max(20,"Max chars is 10"),
      username: z.string().min(1,'UserName Is Required').min(3,'Min Chars 3').max(10,'Max Chars 10'),
      email: z.string().min(1,"Email Is Required").email('Email is Not Valid'),
      dateOfBirth:z.string().refine((value)=>new Date(value)<new Date(),'Date Must Be In The Past '),
      gender: z.enum(['male','female']),
      password: z.string().min(1,'Password Is Required').regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,"Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"),
      rePassword: z.string().min(1,'RePassword Is Required'),
  }).refine((values)=>values.rePassword ==values.password ,{
    message:'RePassword Not Match Password',
    path:['rePassword']
  })

