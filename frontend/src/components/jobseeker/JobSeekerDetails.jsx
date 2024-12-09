import React, { useEffect, useState } from 'react';
import { useGetJobSeekerProfileQuery } from '@/features/api/jobSeekerapi';
import UpdateProfile from './UpdateProfile';

const JobSeekerDetails = () => {
    const [open, setOpen] = useState(false);

    // Fetch job seeker profile using RTK Query
    const { data, isLoading, isError ,refetch} = useGetJobSeekerProfileQuery();




    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }


    // Error state
    if (isError || !data) {
        return <div>Error fetching job seeker details. Please try again later.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Seeker Details</h2>

            {/* Personal Information */}
            <div className="flex items-center space-x-6 mb-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                    <div className="mt-2">
                        <p className="text-gray-600">
                            <span className="font-medium">Name:</span> {data?.name || 'N/A'}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Email:</span> {data?.email || 'N/A'}
                        </p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            </div>

            {/* Profile Information */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-700">Profile</h3>
                <div className="mt-2">
                    <p className="text-gray-600">
                        <span className="font-medium">Bio:</span> {data?.profile?.bio || 'N/A'}
                    </p>
                    <p className="text-gray-600 text-xl">
                        <span className="font-medium">Skills:</span>{' '}
                        {data?.profile?.skills?.length > 0
                            ? data.profile.skills.join(', ')
                            : 'No skills listed'}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Experience:</span> {data?.profile?.experience || 'N/A'}
                    </p>
                    {data?.profile?.resume && (
                        <a
                            href={data.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View Resume
                        </a>
                    )}
                </div>
                <UpdateProfile open={open} setOpen={setOpen} refetch={refetch} />
            </div>
        </div>
    );
};

export default JobSeekerDetails;
