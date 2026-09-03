import AuthGuard from '@/Guards/AuthGuard'
import Login from '@/Pages/Login/Login'
import SignUp from '@/Pages/SignUp/SignUp'
import { createBrowserRouter} from 'react-router-dom'
import Layout from '../Layout/Layout'
import PostGuard from '@/Guards/PostGuard'
import Posts from '@/Pages/Posts/Posts'
import Profile from '@/Pages/Profile/Profile'
import NotFound from '@/Pages/NotFound/NotFound'
import PostDetails from '@/Pages/PostDetails/PostDetails'
import ChangePassword from '../ChangePassword/ChangePassword'

export const routes=createBrowserRouter([
  {path:"",element:<AuthGuard><Login/></AuthGuard>},
  {path:"signup",element:<AuthGuard><SignUp/></AuthGuard>},
  {path:"posts",element:<Layout/>,children:[
    {path:"",element:<PostGuard><Posts/></PostGuard>},
    {path:'changepassword',element:<ChangePassword/>}
  ]},
  {path:'profile',element:<Layout/>,children:[
    {path:'',element:<PostGuard><Profile/></PostGuard>},
    {path:'changepassword',element:<ChangePassword/>}
  ]},
  {path:'postdetails/:id',element:<Layout/>,children:[
    {path:'',element:<PostGuard><PostDetails/></PostGuard>}
  ]},
  {path:"*",element:<NotFound/>},

])