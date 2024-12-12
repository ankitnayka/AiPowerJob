import React, { useState } from 'react';
import UpdateCompany from './UpdateCompany';
import { useEmployerDashBoardQuery } from '@/features/api/employerApi';
import { useSelector } from 'react-redux';

const EmployerDetails = () => {
  const [open, setOpen] = useState(false);

  const companyData=useSelector((state)=>state.employer.employer)
  const {data,isLoading,error,isSuccess,isError,refetch}=useEmployerDashBoardQuery()

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (isError || !data) {
    return <div>Error fetching company details. Please try again later.</div>;
  }


  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Company  Details</h2>

      
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex-1">
          <div className="mt-2">
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {companyData?.companyName || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {companyData?.email || 'N/A'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Contact number:</span> {companyData?.contactNumber || 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <img
            src={`${data?.profile?.companyLogo}`}
            alt="Profileaaa"
            className="w-24 h-24 rounded-full "
          />
        </div>
      </div>
      <UpdateCompany open={open} setOpen={setOpen} refetch={refetch} />
    </div>

  );
};

export default EmployerDetails;
