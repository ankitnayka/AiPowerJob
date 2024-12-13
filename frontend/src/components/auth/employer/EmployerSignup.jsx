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
import {  toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useEmployerSignupMutation } from "@/features/api/employerApi";



const EmployerSignup = () => {

    const [inputData,setInputData]=useState({
        companyName:"",
        email:"",
        password:"",
        contactNumber:""
    })

    const [employerSignup,{data,isSuccess,isLoading,error}] =useEmployerSignupMutation()
    const navigate=useNavigate()

console.log("Banari",data);

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Register SuccessFully !!!")
            navigate("/employerLogin")
        }
        if(error){
            toast.error(error?.data?.message || "Something worng on frontned")
        }
    },[isSuccess,isLoading,error,data])

    const onChangeHandler=(e)=>{
        const {name,value}=e.target;   
        setInputData({...inputData,[name]:value})     
    }

    const onSubmit=()=>{
        console.log(inputData);
        employerSignup(inputData)
    }

    return (
        <div className="flex flex-col mt-24 justify-center items-center my-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create Account(Company)  </CardTitle>
                    <CardDescription>Best platform for Hirring Employe</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-2">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Company Name :</Label>
                                <Input id="username" placeholder="ankit@gmail.com"
                                    type="text"
                                    name="companyName"
                                    value={inputData.companyName}
                                    onChange={onChangeHandler}
                                    />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">email</Label>
                                <Input id="email" placeholder="TataLtd@gmail.com"
                                    type="email"
                                    name="email"
                                value={inputData.email}
                                    onChange={onChangeHandler}
                                    />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Contact number</Label>
                                <Input id="email" placeholder="ankitnaykaa0207@"
                                    type="number"
                                    name="contactNumber"
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
                    <p>Already account <Link to="/employerLogin" className="text-blue-700 cursor-pointer hover:underline">log in </Link></p>
                </CardFooter>
                <CardFooter>
                    <Link to="/signup"
                     className="w-full">
                    <Button 
                     className="w-full"  >
                        
                        click here to As Job Seeker Sign up  </Button>  
                         </Link>
                </CardFooter>
            </Card>
        </div>
    )
}


export default EmployerSignup