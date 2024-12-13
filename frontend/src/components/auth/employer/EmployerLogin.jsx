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
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { useEmployerLoginMutation } from "@/features/api/employerApi";
import { setEmployer } from "@/redux/employerSlice";
import { useDispatch } from "react-redux";


const EmployerLogin = () => {
    const [inputData,setInputData]=useState({  
        email:"",
        password:""
    })

    const navigate=useNavigate()

    const [employerLogin,{isSuccess,data,isLoading,error}]=useEmployerLoginMutation()

    const dispatch=useDispatch()
    

    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Login SuccessFully !!!")
            // dispatch(setJobSeeker(data.jobSeeker));
            dispatch(setEmployer(data?.employer));
    
            console.log("data is ",data);

            navigate("/employerDashBoard/employerDetails")
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
      await  employerLogin(inputData)
    }
    return (
        <div className="flex flex-col mt-24 justify-center items-center my-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log in as <span className="underline text-red-700 font-bold">Company</span>  </CardTitle>
                    <CardDescription>Best platform for job posting</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="TATA@gmail.com" 
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
                <CardFooter className="flex justify-center flex-col ">
                    <Button className="w-full" onClick={onSubmit} >Log in </Button>
                    <p>create new Account <Link to="/employerSignup" className="text-blue-600 hover:underline cursor-pointer">SignUp as Employer</Link></p>
                </CardFooter>
                <CardFooter className="flex justify-center w-full ">
                    <Link to="/login">
                    <Button className=" text-yellow-400"  >click here to  Log in as jobSeeker </Button>     
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}


export default EmployerLogin