import React from 'react'
import { Button } from './ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

function CategoryCarousal() {

    const category = ["frontend developer", "backend developer", "fullstack developer", "Digital Marketing"]

    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {
                        category.map((cat,index)=>(

                            <CarouselItem className='md:basis-1/2 lg:basis-1/2'>
                                <Button className='rounded-full' variant='outline'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategoryCarousal