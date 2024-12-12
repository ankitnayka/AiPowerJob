import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  useEmployerUpdateMutation } from "@/features/api/employerApi";
import { setEmployer } from "@/redux/employerSlice";

const UpdateCompany = ({ open, setOpen, refetch }) => {
    const employer = useSelector((state) => state.employer.employer);

    const dispacth=useDispatch()

    const [inputData, setInputData] = useState({
        companyName: employer?.companyName,
        email: employer?.email,
        companyDescrption: employer?.companyDescrption,
        contactNumber: employer?.contactNumber,
        location: employer?.location,
        industry: employer?.industry
    });


    const [companyLogo, setCompanyLogo] = useState(null);
    

    const [employerUpdate, { data, isSuccess, isLoading, error }] = useEmployerUpdateMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Profile updated successfully okkk");
            console.log(data);
            dispacth(setEmployer(data?.employerUpdate))
            refetch();
           
            setOpen(false);
        }

        if (error) {
            toast.error(error?.message || "Something went wrong");
        }
    }, [isSuccess, error,]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const onChangeFileHandler = (e) => {
        const { name, files } = e.target;
        if (name === "companyLogo") {
            setCompanyLogo(files[0]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const { companyName, email, contactNumber, location, industry, companyDescrption } = inputData;
        
        
        const formData=new FormData()

        formData.append("companyName", companyName);
        formData.append("companyDescrption", companyDescrption);
        formData.append("contactNumber", contactNumber);
        formData.append("email", email);
        formData.append("location", location);
        formData.append("industry", industry);


         formData.append("companyLogo", companyLogo);

        console.log(companyLogo);
        
        await employerUpdate(inputData)


    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mt-10">Edit Company Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-black text-white">
                <DialogHeader>
                    <DialogTitle>Edit Company Details</DialogTitle>
                    <DialogDescription>
                        Make changes to your Dasboard here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 ">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Company Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            name="companyName"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.companyName}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Company Descrption
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            name="companyDescrption"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.companyDescrption}
                        />
                    </div>
                   
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            name="email"
                            type="email"
                            onChange={onChangeHandler}
                            value={inputData.email}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">
                            Contact number
                        </Label>
                        <Input
                            id="skills"
                            className="col-span-3"
                            name="contactNumber"
                            type="number"
                            onChange={onChangeHandler}
                            value={inputData.contactNumber}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="bio"
                            className="col-span-3"
                            name="location"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.location}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">
                            Industry
                        </Label>
                        <Input
                            id="skills"
                            className="col-span-3"
                            name="industry"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.industry}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="resume" className="text-right">
                            Upload Logo
                        </Label>
                        <Input
                            id="resume"
                            className="col-span-3"
                            name="companyLogo"
                            type="file"
                            onChange={onChangeFileHandler}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} type="submit">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCompany;
