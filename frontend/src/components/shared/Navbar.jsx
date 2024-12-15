import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "@/features/api/jobSeekerapi";
import { logoutJobSeeker } from "@/redux/jobSeekerSlice";
import { LogOut } from "lucide-react";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.jobSeeker.isAuthenticated);
  const [logout, { isLoading, isSuccess, error, data, reset }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap(); // Call the API
      dispatch(logoutJobSeeker()); // Update Red
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successful!");
      navigate("/");
      reset(); // Reset mutation state
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong!");
      reset(); // Reset mutation state
    }
  }, [isSuccess, error, data, reset, navigate]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md px-6 py-4  flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/016/138/283/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg"
          alt="Logo"
          className="h-10 w-auto"
        />
        <h1 className="text-2xl ml-2   font-bold ">
          Job <span className="text-[#6A38C2]">Portal</span>
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <ul className="flex items-center gap-4"> 
              <li className="font-bold text-2xl hover:underline hover:drop-shadow-lg text-[#F83002]"><Link to='/'>Home</Link></li>
              <li className="font-bold text-xl hover:underline hover:drop-shadow-lg"><Link to='/jobDashboard'>Jobs</Link></li>
              <li className="font-bold text-xl hover:underline hover:drop-shadow-lg"><Link to='/browse'>Browser</Link></li>
            </ul>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-4">
                <div className="flex flex-col space-y-3">
                  <h2 className="font-semibold text-xl text-gray-800">Ankit Nayka</h2>
                  <Link
                    to="/profile"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/edit-profile"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                  >
                    {isLoading ? "Logging out..." : <>
                      <LogOut className="w-4 h-4" />
                      Logout
                    </>}
                  </button>
                </div>
              </PopoverContent>
            </Popover>

          </>
        ) : (
          <>
            <Link to="/signup">
              <Button className="bg-[#6A38C2] text-white hover:bg-[#8b5ed8]">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
