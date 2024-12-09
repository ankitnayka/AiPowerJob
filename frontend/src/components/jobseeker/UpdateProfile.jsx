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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "@/features/api/jobSeekerapi";
import { toast } from "react-toastify";

const UpdateProfile = ({ open, setOpen ,refetch}) => {
    
    
    const jobSeeker=useSelector((state)=>state.jobSeeker.jobSeeker)

    const [inputData, setInputData] = useState({
        name: jobSeeker?.name,
        email: jobSeeker?.email,
        skills: jobSeeker?.profile?.skills,
        bio: jobSeeker?.profile?.bio,
        experience: jobSeeker?.profile?.experience
    });
    const [updateProfile,{data,isLoading,isSuccess,error}]=useUpdateProfileMutation()



    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Update Profile Details successfully ")
            refetch()
            setOpen(false);
        }
        
        if(error){
            toast.error(error?.message || "Somthing wrong  ")
            
        }
    },[isSuccess,error])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };
    
    const onSubmit = async() => {
        
        console.log(inputData);
        
       await updateProfile(inputData)  
        // Close dialog after submitting
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mt-10">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black text-white">
                <DialogHeader>
                    <DialogTitle> Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-8 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            name="name"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.name}
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
                        <Label htmlFor="bio" className="text-right">
                            Bio
                        </Label>
                        <Input
                            id="bio"
                            className="col-span-3"
                            name="bio"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.bio}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="experience" className="text-right">
                            Skills
                        </Label>
                        <Input
                            id="experience"
                            className="col-span-3"
                            name="skills"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.skills}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="experience" className="text-right">
                            Experience
                        </Label>
                        <Input
                            id="experience"
                            className="col-span-3"
                            name="experience"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.experience}
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

export default UpdateProfile;
