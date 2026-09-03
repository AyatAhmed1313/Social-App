import { AuthContext } from "@/Contexts/AuthContext"
import { Lectern } from "lucide-react"
// import { useContext } from "react"
let token=localStorage.getItem('token')
console.log('token related with object: ',token)
export function showToken(){
token=localStorage.getItem('token')
//  ({token}=useContext(AuthContext))
console.log("token from Header Object: ",token)

}
export const headerObject={
      headers:{
        Authorization:`Bearer ${token}`
      }}

