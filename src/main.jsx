import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.jsx'
import 'flowbite';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '@fontsource/inter'



createRoot(document.getElementById('root')).render(

    <App />

)
