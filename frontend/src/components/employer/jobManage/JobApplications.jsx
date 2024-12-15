import { useGetJobApplicationQuery } from "@/features/api/employerApi";
import React from "react";
import { useParams } from "react-router-dom";

const JobApplications = () => {

    const {jobId}=useParams()
    const { data, isLoading, error } = useGetJobApplicationQuery(jobId);
    console.log(data);
    
 
    if (isLoading) return <p>Loading applications...</p>;
    if (error) return <p>Failed to load applications: {error.message}</p>;

    return (
        <div className="max-w-7xl mx-auto mt-24">
            <h2 className="text-2xl font-bold mb-4">Applications for Job</h2>
            {data?.applications?.length === 0 ? (
                <p>No applications found for this job.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {data?.applications.map((application) => (
                        <div key={application._id} className="p-4 border rounded shadow-sm">
                            <p><strong>Name:</strong> {application.name}</p>
                            <p><strong>Email:</strong> {application.email}</p>
                            <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                            <a
                                href={application.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Download Resume
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobApplications;
