// import viteLogo from '/vite.svg'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import AuthContextProvider from './Contexts/AuthContext'
import { routes } from './Components/RoutersConfigration/RoutersConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'






const queryClient=new QueryClient()


function App() {
  return<>
  
  
    <QueryClientProvider client={queryClient}>

    <AuthContextProvider>
      <RouterProvider router={routes}/>
      <div><Toaster/></div>
    </AuthContextProvider>
   </QueryClientProvider>
  
   



    </>
  
}

export default App
