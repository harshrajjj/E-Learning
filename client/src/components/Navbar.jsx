import React, { useEffect } from 'react'
import { School } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
    Separator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import DarkMode from '../DarkMode';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { Menu } from "lucide-react"

import { useLogoutUserMutation } from "@/features/api/authApi";
import {Link,useNavigate} from "react-router-dom"

import { toast } from "sonner";


const Navbar = () => {
    const user = true;//this is just a dummy variable to check if the user is logged in or not
    // This is a functional component that renders a navigation bar with a logo and title.

    const [logOutUser,{data,isSuccess}] = useLogoutUserMutation();
    // This is a dummy variable to check if the user is logged in or not
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logOutUser();
    }

    useEffect(() => {
        if(isSuccess){
            toast.success(data.message ||"Logout Successfull")
            navigate("/login")
        }
    }
    , [isSuccess])
   
    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            {/*Desktop*/}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-4">
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                </div>

                {/* user icon and dark mode toggle */}
                <div className="flex items-center gap-4">
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 bg-white shadow-md rounded-md p-2 border border-gray-300"
                                    align="end" // Aligns the dropdown to the right of the trigger
                                    side="bottom" // Positions the dropdown below the trigger
                                    sideOffset={5} // Adds spacing between the trigger and the dropdown
                                    alignOffset={0} // Ensures proper horizontal alignment
                                >
                                    <DropdownMenuLabel className="font-bold text-gray-700">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="my-1 border-t border-gray-300" />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md"><Link to="my-learning">My Learning</Link></DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md"><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md" onClick={logoutHandler}>LogOut</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator className="my-1 border-t border-gray-300" />
                                    <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md">DashBoard</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline">Login</Button>
                                <Button>SignUp</Button>
                            </div>
                        )
                    }

                    <DarkMode />
                </div>

            </div>

            {/*Mobile*/}
            <div className='flex md:hidden  justify-between items-center h-full px-4'>
                <h1 className="font-extrabold text-2xl">E-Learning</h1>
            <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar;


const MobileNavbar = () => {
    const role = "instructor"; // This is just a dummy variable to check if the user is an instructor or not
  
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-4 space-y-6">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle className="text-lg font-bold">E-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>
  
          <Separator className="my-2" />
  
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <span className="text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer font-bold">
              My Learning
            </span>
            <span className="text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer font-bold">
              Edit Profile
            </span>
            <span className="text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer font-bold">
              Log Out
            </span>
          </nav>
  
          {/* Footer for Instructor */}
          {role === "instructor" && (
            <SheetFooter className="mt-auto">
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    );
  };