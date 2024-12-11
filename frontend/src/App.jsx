import { createBrowserRouter, Router, RouterProvider, Routes } from "react-router-dom"
import { Button } from "./components/ui/button"
import Home from "./components/Home"
import Login from "./components/auth/jobsekeer/Login"
import Layout from "./components/Layout"
import Signup from "./components/auth/jobsekeer/Signup"
import Profile from "./components/jobseeker/JobSeekerDetails"
import JobSeekerDetails from "./components/jobseeker/JobSeekerDetails"
import EmployerSignup from "./components/auth/employer/EmployerSignup"


const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/profile",
        element:<JobSeekerDetails/>
      },
      //Employer Sign up & Log in 
      {
        path:"/employerSignup",
        element:<EmployerSignup/>
      }
      
    ]
  }
])

function App() {

  return (
   <RouterProvider router={appRouter} />
  )
}

export default App
