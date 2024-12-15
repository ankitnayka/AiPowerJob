import { createBrowserRouter, Router, RouterProvider, Routes } from "react-router-dom"
import { Button } from "./components/ui/button"
import Home from "./components/Home"
import Login from "./components/auth/jobsekeer/Login"
import Layout from "./components/Layout"
import Signup from "./components/auth/jobsekeer/Signup"
import Profile from "./components/jobseeker/JobSeekerDetails"
import JobSeekerDetails from "./components/jobseeker/JobSeekerDetails"
import EmployerSignup from "./components/auth/employer/EmployerSignup"
import EmployerLogin from "./components/auth/employer/EmployerLogin"
import EmployerDetails from "./components/employer/EmployerDetails"
import EmployerDashboard from "./components/employer/EmployerDashboard"
import EmployerOverview from "./components/employer/EmployerOverview"
import ViewJobsPost from "./components/employer/jobManage/ViewJobsPost"
import UpdateJob from "./components/employer/jobManage/UpdateJob"
import JobDashboard from '../src/components/JobDashboard'
import JobDescription from "./components/JobDescription"
import ApplicationForm from "./components/ApplicationForm "
import JobApplications from "./components/employer/jobManage/JobApplications"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/profile",
        element: <JobSeekerDetails />
      },
      //Employer Sign up & Log in 
      {
        path: "/employerSignup",
        element: <EmployerSignup />
      },
      {
        path: "/employerLogin",
        element: <EmployerLogin />
      },
      {
        path: "/employerDashBoard",
        element: <EmployerDashboard />,
        children: [
          {
            path: "employerDetails",
            element: <EmployerDetails />,
          },
          {
            path:"employerOverview",
            element:<EmployerOverview/>
          },
          {
            path:"employerViewJobsPost",
            element:<ViewJobsPost/>
          },
          {
            path:"employerViewJobsPost/:id",
            element:<UpdateJob/>
          },
          {
            path:"jobApplication/:jobId",
            element:<JobApplications/>
          }
          
        ]
      },
      //jobs on Display
      {
        path:"jobDashboard",
        element:<JobDashboard/>
      },
      {
        path:"jobdescription/:jobId",
        element:<JobDescription/>
      },
      {
        path:"applyJob/:jobId",
        element:<ApplicationForm/>
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
