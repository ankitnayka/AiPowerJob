import React, { useState } from "react";
import FilterJob from "./FilterJob";
import { useGetAllJobsJobseekerQuery } from "@/features/api/employerApi";
import Job from "./Job";



const AllJobs = () => {

    const {data}=useGetAllJobsJobseekerQuery()

   
    const [filters,setFilter]=useState({
        location:"",
        jobType:"",
        salaryRange:[0,100000]
    })

    const handleFilterChange =(key,value)  =>{
        setFilter((prev)=>({...prev,[key]:value}))        
    }
    

    
    const filteredjob=data?.allJobs?.filter((job)=>{
        
        const matchesLocation=filters.location ? job.location.includes(filters.location) : true
        const matchesJobType=filters.jobType ? job.jobType === filters.jobType : true;
        const matchesSalary=job.salary >= filters.salaryRange[0] && job.salary <= filters.salaryRange[1];
        
        console.log(matchesLocation);
        return matchesLocation && matchesJobType && matchesSalary
        
    })
  
    return (
        <div className='max-w-7xl mx-auto mt-24'>
            <div className='flex gap-5'>
                <div className='w-20%'>

                    {/* filter page */}
                    <FilterJob filters={filters} onFilterChange={handleFilterChange} />
                </div>

                {/* single job card */}
                <div className="w-80% mt-24">
            
                {
                    
                    
                    // data?.allJobs?.length <= 0 ? <span>Job not found</span> : (
                    //     <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                    //         <div className='grid grid-cols-3 gap-4'>
                    //             {
                    //                 data?.allJobs.map((job) => (
                    //                      <Job job={job} key={job._id} />
                                
                    //                 ))
                    //             }
                    //         </div>

                    //     </div>
                                    
                    // )
                    
                }


                    </div>
                
                {
                    filteredjob?.length ===0 ? (
                        <span>job not found</span>
                    ) :<div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                    <div className='grid grid-cols-3 gap-4'>
                        {filteredjob?.map((job) => (
                            <Job job={job} key={job._id} />
                        ))}
                    </div>
                </div>
                }
                {/* <div className='w-80% mt-24'>
                   
                    <div className='grid grid-cols-3 gap-4'>

                        {sortedJobs.map((job) => (
                            <Job job={job} key={job._id} />
                        ))}
                    </div>
                </div> */}

            </div>



        </div>


    )
}

export default AllJobs