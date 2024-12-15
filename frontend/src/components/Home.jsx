import React from "react";
import Navbar from '../components/shared/Navbar'
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import HeroSection from "./HeroSection";
import CategoryCarousal from "./CategoryCarousal";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import LatestJobCards from "./LatestJobCards";


const Home = () => {
    return (
        <>
            <HeroSection/>
            <CategoryCarousal/>
            <LatestJobCards/>
            <Footer/>
        </>
    )
}

export default Home