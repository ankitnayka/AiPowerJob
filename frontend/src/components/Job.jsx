import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

function Job({ job }) {
    const navigate = useNavigate();
    const jobId = job._id;

    const dayAgoFunction = (mongodbTime) => {
        const createAt = new Date(mongodbTime);
        const currentTime = new Date();
        const differenceTime = currentTime - createAt;
        return Math.floor(differenceTime / (1000 * 60 * 60 * 24)); // Correct formula for days
    };

    const daysAgo = dayAgoFunction(job._createdAt);
    const displayDate = daysAgo === 0 ? "Today" : `${daysAgo} Days Ago`;

    return (
        <div className='p-5 max-w-7xl   ml-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-500 text-sm'>{displayDate}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src='https://img.freepik.com/premium-vector/minimalist-logo-design-any-corporate-brand-business-company_1253202-77511.jpg' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-bold'>{job?.jobTitle}</h1>
                    <p className='text-gray-600'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.salary}</h1>
                <p className='text-gray-600 text-sm'>{job.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary}</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/jobdescription/${jobId}`)} variant="outline">View Job Details</Button>
                <Button  className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    );
}

export default Job;
