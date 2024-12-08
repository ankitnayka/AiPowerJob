import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./shared/Navbar";


const Layout=()=>{
    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}

export default Layout