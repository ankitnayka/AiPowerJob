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

const UpdateProfile = ({ open, setOpen, refetch }) => {
    const jobSeeker = useSelector((state) => state.jobSeeker.jobSeeker);

    const [inputData, setInputData] = useState({
        fullName: jobSeeker?.fullName,
        phoneNumber: jobSeeker?.phoneNumber,
        email: jobSeeker?.email,
        skills: jobSeeker?.profile?.skills?.join(", "),  // Ensure skills are shown as a string
        bio: jobSeeker?.profile?.bio,
        experience: jobSeeker?.profile?.experience
    });

    const [resume, setResume] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const [updateProfile, { data, isLoading, isSuccess, error }] = useUpdateProfileMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Profile updated successfully");
            refetch();
            setOpen(false);
        }

        if (error) {
            toast.error(error?.message || "Something went wrong");
        }
    }, [isSuccess, error]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const onChangeFileHandler = (e) => {
        const { name, files } = e.target;
        if (name === "resume") {
            setResume(files[0]);
        } else if (name === "profilePhoto") {
            setProfilePhoto(files[0]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const { fullName, email, skills, bio, phoneNumber,experience } = inputData;
        const formData = new FormData();

        formData.append("fullName", fullName);
        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("bio", bio);
        formData.append("experience", experience);
        formData.append("skills", skills.split(",").map((skill) => skill.trim()));  // Convert string to array

        if (resume) formData.append("resume", resume);
        if (profilePhoto) formData.append("profilePhoto", profilePhoto);

        await updateProfile(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mt-10">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black text-white">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
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
                            name="fullName"
                            type="text"
                            onChange={onChangeHandler}
                            value={inputData.fullName}
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
                            Phone number
                        </Label>
                        <Input
                            id="skills"
                            className="col-span-3"
                            name="phoneNumber"
                            type="number"
                            onChange={onChangeHandler}
                            value={inputData.phoneNumber}
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
                        <Label htmlFor="skills" className="text-right">
                            Skills
                        </Label>
                        <Input
                            id="skills"
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="resume" className="text-right">
                            Upload Resume (PDF)
                        </Label>
                        <Input
                            id="resume"
                            className="col-span-3"
                            name="resume"
                            type="file"
                            onChange={onChangeFileHandler}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="profilePhoto" className="text-right">
                            Profile Photo
                        </Label>
                        <Input
                            id="profilePhoto"
                            className="col-span-3"
                            name="profilePhoto"
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

export default UpdateProfile;
