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


const Signup = () => {

    const [inputData,setInputData]=useState({
        name:"",
        email:"",
        password:""
    })

    const [registerJobseeker,{data,isLoading,isSuccess,error}]=useRegisterJobseekerMutation()


    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Register SuccessFully !!!")
        }
        if(error){
            toast.error(error?.message || "Something worng on frontned")
        }
    },[isSuccess,isLoading,error])

    const onChangeHandler=(e)=>{
        const {name,value}=e.target;   
        setInputData({...inputData,[name]:value})     
    }

    const onSubmit=()=>{
        console.log(inputData);
        registerJobseeker(inputData)
    }

    return (
        <div className="flex flex-col justify-center items-center my-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create Account  </CardTitle>
                    <CardDescription>Best platform for searchin job</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="ankit@gmail.com"
                                    type="text"
                                    name="name"
                                    value={inputData.name}
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
                <CardFooter className="flex justify-between">
                    <Button onClick={onSubmit} >Sign up  </Button>
                    
                </CardFooter>
            </Card>
        </div>
    )
}


export default Signup