import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";


const EmployerOverview = () => {
    return (
        <div className="max-w-7xl flex gap-8 my-10 ">
            <div className="w-1/3 hover:drop-shadow-lg">
                <Card>
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="font-bold text-2xl">Application Job</CardTitle>
                        <CardDescription className="text-xl">02.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div className="w-1/3 hover:drop-shadow-lg">
                <Card>
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="font-bold text-2xl">Active Job </CardTitle>
                        <CardDescription className="text-xl">19.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div className="w-1/3 hover:drop-shadow-lg">
                <Card>
                    <CardHeader className="flex flex-col items-center">
                        <CardTitle className="font-bold text-2xl">Notification</CardTitle>
                        <CardDescription className="text-xl">70</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            
        </div>
    )
}


export default EmployerOverview