import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Stats } from "@/types/queries";
import React, { use, useEffect, useState } from "react";

const CompareCard = ({ stats }: { stats: Stats }) => {
  //return a string that says how much higher or lower the percentage difference is
  function percentageDifference(val1: number, val2: number) {
    const difference = val2 - val1;
    const percentageDiff = Math.round((difference / val1) * 100);
    const str =
      percentageDiff === 0
        ? "the same"
        : Math.abs(percentageDiff) +
          (percentageDiff > 0 ? "% higher " : "% lower ");
    return {
      str: str,
      color: percentageDiff > 0 ? "text-primary" : "text-destructive",
    };
  }

  return (
    <div className="w-full h-[200px] ">
      <Carousel className="drop-shadow-md">
        <CarouselContent>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
              <div className="flex flex-col items-center justify-center">
                <h1>Today's Calories Intake is </h1>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_calories,
                    stats.current.total_calories
                  );

                  return <h1 className={percentage.color}>{percentage.str}</h1>;
                })()}
                <h1>than yesterday's</h1>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center">
                  <h1>Today's Protein Intake is </h1>
                  {(() => {
                    const percentage = percentageDifference(
                      stats.previous.total_protein,
                      stats.current.total_protein
                    );

                    return (
                      <h1 className={percentage.color}>{percentage.str}</h1>
                    );
                  })()}
                  <h1>than yesterday's</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center">
                  <h1>Today's Fat Intake is </h1>
                  {(() => {
                    const percentage = percentageDifference(
                      stats.previous.total_fat,
                      stats.current.total_fat
                    );

                    return (
                      <h1 className={percentage.color}>{percentage.str}</h1>
                    );
                  })()}
                  <h1>than yesterday's</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center">
                  <h1>Today's Carbs Intake is </h1>
                  {(() => {
                    const percentage = percentageDifference(
                      stats.previous.total_carbs,
                      stats.current.total_carbs
                    );

                    return (
                      <h1 className={percentage.color}>{percentage.str}</h1>
                    );
                  })()}
                  <h1>than yesterday's</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center">
                  <h1>Today's Sugar Intake is </h1>
                  {(() => {
                    const percentage = percentageDifference(
                      stats.previous.total_sugar,
                      stats.current.total_sugar
                    );

                    return (
                      <h1 className={percentage.color}>{percentage.str}</h1>
                    );
                  })()}
                  <h1>than yesterday's</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center">
                  <h1>Today's Fiber Intake is </h1>
                  {(() => {
                    const percentage = percentageDifference(
                      stats.previous.total_fiber,
                      stats.current.total_fiber
                    );

                    return (
                      <h1 className={percentage.color}>{percentage.str}</h1>
                    );
                  })()}
                  <h1>than yesterday's</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="ml-[50px]" />
        <CarouselNext className="mr-[50px]" />
      </Carousel>
    </div>
  );
};

export default CompareCard;
