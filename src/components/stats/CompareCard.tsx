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
  function percentageDifference(val1: number, val2: number) {
    const difference = val2 - val1;
    const percentageDiff = (difference / Math.abs(val1 + val2) / 2) * 100;
    return percentageDiff;
  }
  return (
    <div className="w-full h-[200px] ">
      <Carousel className="drop-shadow-md">
        <CarouselContent>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
              <div className="flex flex-col items-center justify-center text-xl">
                <h1>{"Today's"} Calories Intake is </h1>
                {percentageDifference(
                  stats.previous.total_calories,
                  stats.current.total_calories
                ) > 0 ? (
                  <h1 className="text-primary font-bold">
                    {Math.floor(
                      percentageDifference(
                        stats.previous.total_calories,
                        stats.current.total_calories
                      ) * 100
                    ) + "% higher "}
                  </h1>
                ) : (
                  <h1 className="text-destructive font-bold ">
                    {Math.floor(
                      percentageDifference(
                        stats.previous.total_calories,
                        stats.current.total_calories
                      ) * 100
                    ) + "% lower "}
                  </h1>
                )}
                <h1>than {"yesterday's"}</h1>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center text-xl">
                  <h1>{"Today's"} Protein Intake is </h1>
                  {percentageDifference(
                    stats.previous.total_protein,
                    stats.current.total_protein
                  ) > 0 ? (
                    <h1 className="text-primary font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_protein,
                          stats.current.total_protein
                        ) * 100
                      ) + "% higher "}
                    </h1>
                  ) : (
                    <h1 className="text-destructive font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_protein,
                          stats.current.total_protein
                        ) * 100
                      ) + "% lower "}
                    </h1>
                  )}
                  <h1>than {"yesterday's"}</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center text-xl">
                  <h1>{"Today's"} Fat Intake is </h1>
                  {percentageDifference(
                    stats.previous.total_fat,
                    stats.current.total_fat
                  ) > 0 ? (
                    <h1 className="text-primary font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_fat,
                          stats.current.total_fat
                        ) * 100
                      ) + "% higher "}
                    </h1>
                  ) : (
                    <h1 className="text-destructive font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_fat,
                          stats.current.total_fat
                        ) * 100
                      ) + "% lower "}
                    </h1>
                  )}
                  <h1>than {"yesterday's"}</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center text-xl">
                  <h1>{"Today's"} Carbs Intake is </h1>
                  {percentageDifference(
                    stats.previous.total_carbs,
                    stats.current.total_carbs
                  ) > 0 ? (
                    <h1 className="text-primary font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_carbs,
                          stats.current.total_carbs
                        ) * 100
                      ) + "% higher "}
                    </h1>
                  ) : (
                    <h1 className="text-destructive font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_carbs,
                          stats.current.total_carbs
                        ) * 100
                      ) + "% lower "}
                    </h1>
                  )}
                  <h1>than {"yesterday's"}</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center text-xl">
                  <h1>{"Today's"} Sugar Intake is </h1>
                  {percentageDifference(
                    stats.previous.total_sugar,
                    stats.current.total_sugar
                  ) > 0 ? (
                    <h1 className="text-primary font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_sugar,
                          stats.current.total_sugar
                        ) * 100
                      ) + "% higher "}
                    </h1>
                  ) : (
                    <h1 className="text-destructive font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_sugar,
                          stats.current.total_sugar
                        ) * 100
                      ) + "% lower "}
                    </h1>
                  )}
                  <h1>than {"yesterday's"}</h1>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white">
              <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black">
                <div className="flex flex-col items-center justify-center text-xl">
                  <h1>{"Today's"} Fiber Intake is </h1>
                  {percentageDifference(
                    stats.previous.total_fiber,
                    stats.current.total_fiber
                  ) > 0 ? (
                    <h1 className="text-primary font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_fiber,
                          stats.current.total_fiber
                        ) * 100
                      ) + "% higher "}
                    </h1>
                  ) : (
                    <h1 className="text-destructive font-bold">
                      {Math.floor(
                        percentageDifference(
                          stats.previous.total_fiber,
                          stats.current.total_fiber
                        ) * 100
                      ) + "% lower "}
                    </h1>
                  )}
                  <h1>than {"yesterday's"}</h1>
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
