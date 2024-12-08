import React from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Login = () => {
    return (
        <div className="flex flex-col justify-center items-center my-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log in </CardTitle>
                    <CardDescription>Best platform for searchin job</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Name</Label>
                                <Input id="email" placeholder="ankit@gmail.com" 
                                type="email" 
                                    name="email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="**********" 
                                type="password"
                                name="password"
                                />
                            </div>
                          
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button >Log in </Button>
                    <Button variant="outline">Cancel</Button>
                </CardFooter>
            </Card>
        </div>
    )
}


export default Login