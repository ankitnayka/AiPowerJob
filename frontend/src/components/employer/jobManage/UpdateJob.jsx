import React, { useEffect, useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useJobUpdateDetailsMutation } from "@/features/api/employerApi";

const UpdateJob = () => {

    const params=useParams()
    const id=params.id
    console.log("params id",id);
    
    const [jobUpdateDetails,{data,isSuccess,isLoading,error}]=useJobUpdateDetailsMutation()
    const [inputData, setInputData] = useState({
        jobTitle: "",
        jobDescription: "",
        location: "",
        datePosted: "",
        status: "closed"
    })


    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Job Details update !!")
        }
        if(error){
            toast.error(data?.message || "Something wrong !!")
        }
    },[isSuccess,error])

    const selectedStatus=(value)=>{
        setInputData({...inputData,status:value})
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setInputData({ ...inputData, [name]: value })
    }

    const handleSubmit=()=>{
        console.log(inputData);
        jobUpdateDetails({inputData,id})
    }

    return (
        <div className="max-w-7xl   ">
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Update Job Details</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex items-center  gap-4">
                                <Label htmlFor="jobtitle">jobtitle   </Label>
                                <Input id="jobtitle"
                                    name="jobTitle"
                                    value={inputData.jobTitle}
                                    onChange={onChangeHandler}
                                    placeholder="Title of job" />
                            </div>
                            <div className="flex items-center  gap-4">
                                <Label htmlFor="jobDescription">jobDescription   </Label>
                                <Input id="jobDescription"
                                    name="jobDescription"
                                    value={inputData.jobDescription}
                                    onChange={onChangeHandler}
                                    placeholder="add jobDescription" />
                            </div>
                            <div className="flex items-center  gap-4">
                                <Label htmlFor="location">Location   </Label>
                                <Input id="location"
                                    name="location"
                                    value={inputData.location}
                                    onChange={onChangeHandler}
                                    placeholder="add location" />
                            </div>
                            <div className="flex items-center  gap-4">
                                <Label htmlFor="jobDescription">Date of posted    </Label>
                                <Input className="w-[150px]"
                                    id="datePosted"
                                    type="date"
                                    name="datePosted"
                                    value={inputData.datePosted}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="flex w-[100px] items-center gap-4">
                                <Label htmlFor="framework">Status</Label>
                                <Select 
                                defaultValue={inputData.status}
                                onValueChange={selectedStatus}
                                >
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="job status" onChange={onChangeHandler} name="status" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Closed</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleSubmit}>Update Details</Button>
                    
                </CardFooter>
            </Card>
        </div>
    )
}


export default UpdateJob