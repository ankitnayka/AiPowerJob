import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useAddNewJobMutation, useDeleteJobMutation, useEmployerViewJobsQuery } from "@/features/api/employerApi";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";


const ViewJobsPost = () => {

    const { data, refetch } = useEmployerViewJobsQuery()
    //RTK QUERY for add new job
    const [addNewJob, { data: newJobData, isLoading, isSuccess, error }] = useAddNewJobMutation()

    //RTK QUERY of delete job
    const [deleteJob, { data: deletedata, isSuccess: deleteSuccess, error: deleteError }] = useDeleteJobMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            toast.success(newJobData.message || "new job added !!")

        }
        if (deleteSuccess) {
            toast.success(deleteSuccess.message || " job delete!!")
        }
        if (deleteError) {

            toast.error(error.message || "Something wrong!!")
        }
        if (error) {
            toast.error(error.message || "Something wrong!!")
        }
    }, [isSuccess, newJobData, deleteError, deleteSuccess])

    const [inputData, setInputData] = useState(
        { jobTitle: "", jobDescription: "", location: "", })


    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(inputData);
        await addNewJob(inputData)
    };

    const handleDelete = (id) => {
        const confirmdelete = window.confirm("Are sure to delete this job")
        if (confirmdelete) {

            deleteJob(id)
            console.log(id);
            refetch()
        }

    }
    return (
        <div className="max-w-7xl mt-24">
            <dir className="max-w-7xl">
                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Add New Job </CardTitle>
                        <CardDescription>Details of your job posting.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <Label className="font-medium" htmlFor="jobTitle">Job Title</Label>
                                    <Input
                                        id="jobTitle"
                                        name="jobTitle"
                                        value={inputData.jobTitle}
                                        onChange={onChangeHandler}
                                        placeholder="Title of the job"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="font-medium" htmlFor="jobDescription">Job Description</Label>
                                    <Input
                                        id="jobDescription"
                                        name="jobDescription"
                                        value={inputData.jobDescription}
                                        onChange={onChangeHandler}
                                        placeholder="Add job description"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label className="font-medium" htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={inputData.location}
                                        onChange={onChangeHandler}
                                        placeholder="Add location"
                                    />
                                </div>

                                <CardFooter className="flex justify-between">
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? "Updating..." : "Add new Job"}


                                    </Button>
                                </CardFooter>
                            </div>
                        </form>
                    </CardContent>

                </Card>
            </dir>

            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px] ">Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead >Date Posted</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead className="flex justify-center items-center space-x-2">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((job, index) => (<>
                            <TableRow key={index}>
                                <TableCell className=" ">{job?.jobTitle}</TableCell>
                                <TableCell>{job?.location}</TableCell>
                                <TableCell>{job?.status || "NA"}</TableCell>
                                <TableCell >2-july-2024</TableCell>
                                <TableCell >{data?.numberofApplicant?.length}</TableCell>
                                <TableCell className="flex gap-2 justify-center items-center space-x-2">
                                    <Edit className="text-blue-700"
                                        onClick={() => navigate(`${job._id}`)}

                                    /> <Delete

                                        onClick={() => handleDelete(job._id)}
                                        className="text-red-700" />
                                </TableCell>
                            </TableRow>
                        </>))

                    }
                </TableBody>
            </Table>
            {
                data?.length > 0 ?
                    (
                        <>
                            <Pagination className="my-4">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>) : null
            }

        </div>
    )
}


export default ViewJobsPost