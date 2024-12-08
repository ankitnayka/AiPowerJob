import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const NavBar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/016/138/283/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg"
                    alt="AI Job Portal Logo"
                    className="h-10 w-auto" // Adjust size as needed
                /> <h1 className='text-2xl ml-2 font-bold'>job <span className='text-[#F83002]'>Portal</span></h1>
                <div >
                </div>
            </Link>
            {/* Navigation Links */}
            <ul className="flex space-x-6">
                <Link to='/signup' >
                <Button className='bg-[#6A38C2] hover:bg-[#2f155c'>SignUp</Button>
                </Link>

                <Link to="/login"><Button variant='outline'>Login</Button>
                </Link>
                <Popover>
                    <PopoverTrigger><Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>DashBoard</PopoverContent>
                </Popover>

            </ul>
        </nav>
    );
};

export default NavBar;
