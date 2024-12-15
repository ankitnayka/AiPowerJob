import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useApplyJobMutation } from "@/features/api/jobSeekerapi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


const ApplicationForm =()=>{
    
    const [inputData, setInputdata] = useState({
        name: "",
        email: "",
        coverLetter: "",
    });

    const { jobId } = useParams();
    

    const[applyJob,{data,isSuccess,isLoading,error}]=useApplyJobMutation();


    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Successfully job apply")

        }

        if(error){
            toast.error(data?.message || "something wrong")
        }
    },[data,isSuccess,error])

    const [resume,setResume]=useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputdata({...inputData,[name]:value})
    };

    const handleFileChange=(e)=>{
        const {name,files}=e.target
        if(name==='resume'){
            setResume(files[0])
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("name", inputData.name);
        formDataObj.append("email", inputData.email);
        formDataObj.append("coverLetter", inputData.coverLetter);
        if(resume)  formDataObj.append("resume", resume);
        applyJob({formDataObj,jobId})
    }

    return (
        <div>
             <div className="max-w-lg mx-auto p-4 border mt-20 rounded shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Apply for the Job</h2>
            <div className="mb-4">
                <Label className="block text-gray-700">Name</Label>
                <Input
                    type="text"
                    name="name"
                    value={inputData.name}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <Label className="block text-gray-700">Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={inputData.email}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <Label className="block text-gray-700">Resume</Label>
                <Input
                    type="file"
                    name="resume"
                    accept= 'application/pdf'
                    onChange={handleFileChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <Label className="block text-gray-700">Cover Letter</Label>
                <textarea
                    name="coverLetter"
                    value={inputData.coverLetter}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                />
            </div>
            <Button onClick={handleSubmit} className=" text-white px-4 py-2 rounded">
                Submit Application
            </Button>
        </div>
        </div>
    )
}

export default ApplicationForm 