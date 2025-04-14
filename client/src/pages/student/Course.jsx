import React from 'react'

import { Card } from "@/components/ui/card"; // Import the Card component for styling

import { CardContent } from "@/components/ui/card"; // Import the CardContent component for card content

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import the Avatar component for user profile images

import { Badge } from "@/components/ui/badge"; // Import the Badge component for displaying labels

const Course = () => {
    return (
        <Card className="dark:bg-white shadow-lg hover:shadow-2xl transform hover:scale=105 transition-all duration-300 rounded-lg overflow-hidden">
            <div className="relative">
                <img
                    src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
                    alt="Course Thumbnail"
                    className='w-full h-36 object-cover rounded-t-lg'
                />
            </div>
            <CardContent className={"px-4 py-5 space-y-3"}>
                <h1 className='hover:underline font-bold text-lg truncate'>Nextjs Complete Couse in Hindi</h1>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className='font-medium text-sm'>Patel MernStack</h1>
                    </div>
                    <Badge className={"bg-green-500 text-white font-semibold px-2 py-1 rounded-full"}>
                        Advance
                    </Badge>
                </div>
                <div className='text-lg font-bold'>
                    <span>₹499</span>
                </div>
            </CardContent>
        </Card>
    );
}

export default Course;