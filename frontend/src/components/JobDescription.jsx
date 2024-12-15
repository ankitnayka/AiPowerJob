import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleJobDescriptionQuery } from "@/features/api/employerApi";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";

const JobDescription = () => {
    const params = useParams();
    const jobId = params.jobId;
    const { data } = useGetSingleJobDescriptionQuery(jobId)
    console.log(data);

    const navigate = useNavigate()

    return (
    <>
        <div>

            <h1 className="mt-48"> <Card className="max-w-7xl">
                <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                    <CardDescription>Apply for job for new future</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name" className="font-serif text-2xl" > Job Title : <span>
                                    {data?.job?.jobTitle}</span> </Label>
                                <Label htmlFor="name" className="font-serif text-2xl" > Job Title : <span>
                                    {data?.job?.jobDescription}</span> </Label>
                                <Label htmlFor="name" className="font-serif text-2xl" >
                                    Location : <span>{data?.job?.location}</span> </Label>
                                <Label htmlFor="name" className="font-serif text-2xl" >
                                    Location : <span>{data?.job?.salary}</span> </Label>
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate('/jobDashboard')} >cancel</Button>
                    <Link to={`/applyJob/${jobId}`}>
                    <Button className='bg-blue-600 ' >Apply</Button>
                    </Link>

                </CardFooter>
            </Card></h1>
        </div>
    </>)
}

export default JobDescription