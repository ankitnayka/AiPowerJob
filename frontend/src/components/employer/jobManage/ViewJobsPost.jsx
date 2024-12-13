import React from "react";
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

import { useEmployerViewJobsQuery } from "@/features/api/employerApi";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ViewJobsPost = () => {

    const { data, isSuccess, isLoading } = useEmployerViewJobsQuery()
    console.log("Data", data);

    const navigate=useNavigate()

    return (
        <div className="max-w-7xl ">
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
                        data?.map((job,index) =>(<>
                            <TableRow key={index}>
                                <TableCell className=" ">{job?.jobTitle}</TableCell>
                                <TableCell>{job?.location}</TableCell>
                                <TableCell>{job?.status || "NA"}</TableCell>
                                <TableCell >2-july-2024</TableCell>
                                <TableCell >{data?.numberofApplicant?.length}</TableCell>
                                <TableCell className="flex gap-2 justify-center items-center space-x-2">
                                <Edit className="text-blue-700"
                                    onClick={()=>navigate(`${job._id}`)}

                                /> <Delete className="text-red-700" /> 
                                    </TableCell>
                            </TableRow>
                        </>))

                    }
                </TableBody>
            </Table>
            {
                data?.length>0 ?
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
                    </>):null
            }

        </div>
    )
}


export default ViewJobsPost