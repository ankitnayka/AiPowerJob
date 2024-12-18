import React ,{useState,useEffect}from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginJobseekerMutation } from "@/features/api/jobSeekerapi";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { setJobSeeker } from "@/redux/jobSeekerSlice";
import { useDispatch } from "react-redux";


const Login = () => {
    const [inputData,setInputData]=useState({
        
        email:"",
        password:""
    })

    const navigate=useNavigate()

    const[loginJobseeker,{data,isLoading,isSuccess,error}]=useLoginJobseekerMutation()

    const dispatch=useDispatch()
    

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Login SuccessFully !!!")
            // dispatch(setJobSeeker(data.jobSeeker));
            dispatch(setJobSeeker(data?.jobSeeker));
    
            console.log("data is ",data);

            navigate("/")
        }
        if(error){
            toast.error(error?.data?.message || "Something worng on frontned")
        }
    },[isSuccess,isLoading,error])

    const onChangeHandler=(e)=>{
        const {name,value}=e.target;   
        setInputData({...inputData,[name]:value})     
    }

    const onSubmit=async()=>{
        console.log(inputData);
       await loginJobseeker(inputData)
    }
    return (
        <div className="flex mt-24 flex-col justify-center items-center my-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log in </CardTitle>
                    <CardDescription>Best platform for searchin job</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Name</Label>
                                <Input id="email" placeholder="ankit@gmail.com" 
                                type="email" 
                                    name="email"
                                    value={inputData.email}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="**********" 
                                type="password"
                                name="password"
                                value={inputData.password}
                                onChange={onChangeHandler}
                                />
                            </div>
                          
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center flex-col">
                    <Button className="w-full" onClick={onSubmit} >Log in </Button> 
                    <p>create new Account <Link to="/signup" className="text-blue-600 hover:underline cursor-pointer">SignUp as JobSeeker</Link></p>
                </CardFooter>
                <CardFooter className="flex justify-center ">
                    <Link to="/employerLogin">
                    <Button className="w-full text-yellow-400"  >click here to  Log in as Employer </Button>     
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}


export default Login