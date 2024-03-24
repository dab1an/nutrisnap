import React from "react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CompareCard = () => {
  const [stats, setStats] = useState<object>();

  const getStats = async (period: string) => {
    try {
      const response = await fetch(
        `/auth/get-stats?email=${"jschuster8765@gmail.com"}&period=${period}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const newRes = data;
        setStats(newRes.meals.rows[0]);
        return newRes.meals.rows;
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="w-[90%] h-[200px]">
      <Carousel className="">
        <CarouselContent>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
              <h1>Your protein intake is</h1>
              <h1></h1>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white"></div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white"></div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white"></div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white"></div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CompareCard;
