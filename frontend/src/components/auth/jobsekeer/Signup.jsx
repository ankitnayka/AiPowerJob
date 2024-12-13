import React, { useEffect, useState } from "react";
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
import { useRegisterJobseekerMutation } from "@/features/api/jobSeekerapi";
import {  toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const [inputData,setInputData]=useState({
        fullName:"",
        email:"",
        password:"",
        phoneNumber:""
    })

    const [registerJobseeker,{data,isLoading,isSuccess,error}]=useRegisterJobseekerMutation()
console.log('data',data);

    const navigate=useNavigate()


    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Register SuccessFully !!!")
            navigate("/login")
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
       await registerJobseeker(inputData)
    }

    return (
        <div className="flex mt-24 flex-col justify-center items-center my-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create Account  </CardTitle>
                    <CardDescription>Best platform for searchin job</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-2">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="ankit@gmail.com"
                                    type="text"
                                    name="fullName"
                                    value={inputData.fullName}
                                    onChange={onChangeHandler}
                                    />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">email</Label>
                                <Input id="email" placeholder="ankitnaykaa0207@"
                                    type="email"
                                    name="email"
                                value={inputData.email}
                                    onChange={onChangeHandler}
                                    />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Phone number</Label>
                                <Input id="email" placeholder="ankitnaykaa0207@"
                                    type="number"
                                    name="phoneNumber"
                                value={inputData.phoneNumber}
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
                <CardFooter className="flex justify-center w-full flex-col">
                    <Button className="w-full" onClick={onSubmit} >Sign up  </Button>  
                    <p>Already Acocunt  <Link to="/login" className="text-blue-600 hover:underline cursor-pointer">Login  as jobSeeker</Link></p>
                </CardFooter>
                <CardFooter>
                    <Link to="/employerSignup"
                     className="w-full">
                    <Button 
                     className="w-full text-yellow-400"  >
                        
                        click here to As Employer Sign up  </Button>  
                         </Link>
                </CardFooter>
            </Card>
        </div>
    )
}


export default Signup