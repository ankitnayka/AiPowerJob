import { useEmployerLogoutMutation } from "@/features/api/employerApi";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutEmployer, setEmployer } from "@/redux/employerSlice";


const EmployerDashboard = () => {

    const [employerLogout, { isLoading, isSuccess, error, data, reset }] = useEmployerLogoutMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Logout Successfully")
            navigate("/employerLogin")
        }
    }, [isSuccess, isLoading])

    const handleLogout = async () => {
        try {
            await employerLogout().unwrap();
            dispatch(logoutEmployer());
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <div>
            <div className="w-1/5 bg-[#2c3e50] mt-20 text-white h-screen fixed drop-shadow-xl">
                <h1 className="font-bold p-4 text-2xl  text-white mb-12 ">Employer DashBoard</h1>
                <div className="">
                    <Link to="/employerDashBoard/employerOverview">      <h4 className=" ml-2   p-3 text-xl  hover:bg-[#34495e] ">Overview</h4> </Link>
                </div>
                <div className="">
                    <Link to="/employerDashBoard/employerViewJobsPost">
                        <h4 className=" ml-2   p-3  hover:bg-[#34495e] ">Manage Job</h4>
                    </Link>
                </div>
                <div className="">
                    <h4 className=" ml-2   p-3  hover:bg-[#34495e] ">Candidate</h4>
                </div>
                <div className="">
                    <Link to="/employerDashBoard/employerDetails"> <h4 className=" ml-2   p-3 hover:bg-[#34495e] ">Profile</h4></Link>
                </div>
                <div className="">
                    <h4
                        onClick={handleLogout}
                        className=" ml-2   p-3 hover:bg-[#34495e] cursor-pointer ">Log out</h4>
                </div>


            </div>
            <div className="w-4/5 ml-[20%] p-6">
                <Outlet />
            </div>
        </div>




    )
}

export default EmployerDashboard