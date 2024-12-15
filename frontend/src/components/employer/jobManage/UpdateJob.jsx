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
import { useEmployerViewJobsQuery, useJobUpdateDetailsMutation } from "@/features/api/employerApi";

const UpdateJob = () => {
    const { data: updateData } = useEmployerViewJobsQuery();
    const params = useParams();
    const id = params.id;
   
    console.log("update data",updateData);
    
    const jobDetails = updateData?.jobs?.find((job) => job._id === id);
  
  
  
    const [inputData, setInputData] = useState({
        jobTitle: "",
        jobDescription: "",
        jobType: "",
        location: "",
        datePosted: "",
        status: "",
        salary: ""
    });


    const [jobUpdateDetails, { data, isSuccess, isLoading, error }] = useJobUpdateDetailsMutation();

    const formatDate = (date) => {
        if (!date) return "";
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (jobDetails) {
            setInputData({
                jobTitle: jobDetails.jobTitle || "",
                jobDescription: jobDetails.jobDescription || "",
                jobType: jobDetails.jobType || "",
                location: jobDetails.location || "",
                datePosted: formatDate(jobDetails.datePosted),
                status: jobDetails.status || "",
                salary: jobDetails.salary || "",
            });
        }
    }, [jobDetails]);

    // Show toast notifications on success or error
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Job Details updated successfully!");
        }
        if (error) {
            toast.error(error?.data?.message || "Something went wrong!");
        }
    }, [isSuccess, error]);

    // Handle input changes
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    // Handle select changes
    const selectedStatus = (value) => {
        setInputData({ ...inputData, status: value });
    };

    const selectedJobType = (value) => {
        setInputData({ ...inputData, jobType: value })
    }
    const handleSubmit = () => {
        console.log(inputData);
        jobUpdateDetails({ inputData, id });
    };

    return (
        <div className="max-w-7xl mt-24">
            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Update Job Details</CardTitle>
                    <CardDescription>Update the details of your job posting.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="jobTitle">Job Title</Label>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={inputData.jobTitle}
                                    onChange={onChangeHandler}
                                    placeholder="Title of the job"

                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="jobDescription">Job Description</Label>
                                <Input
                                    id="jobDescription"
                                    name="jobDescription"
                                    value={inputData.jobDescription}
                                    onChange={onChangeHandler}
                                    placeholder="Add job description"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={inputData.location}
                                    onChange={onChangeHandler}
                                    placeholder="Add location"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="jobType">jobType</Label>
                                <Select
                                    defaultValue={inputData.jobType}
                                    onValueChange={selectedJobType}
                                >
                                    <SelectTrigger id="JobType">
                                        <SelectValue placeholder="Job Type" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Part-time">Part-time</SelectItem>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="salary">Salary</Label>
                                <Input
                                    id="salary"
                                    type="Number"
                                    name="salary"
                                    value={inputData.salary}
                                    onChange={onChangeHandler}
                                    placeholder="Add Salary"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="datePosted">Date Posted</Label>
                                <Input
                                    className="w-[150px]"
                                    id="datePosted"
                                    type="date"
                                    name="datePosted"
                                    value={inputData.datePosted}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    defaultValue={inputData.status}
                                    onValueChange={selectedStatus}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Job status" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Details"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UpdateJob;
