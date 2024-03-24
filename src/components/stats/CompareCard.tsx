import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Stats } from "@/types/queries";
import { BarChart } from "@mui/x-charts/BarChart";
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
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black p-12 pl-14">
              <div className="text-[13px]">
                <span>Today's Calories Intake is </span>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_calories,
                    stats.current.total_calories
                  );

                  return (
                    <span className={percentage.color}>{percentage.str}</span>
                  );
                })()}
                <span>than yesterday's</span>
              </div>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Yesterday", "Today"] }]}
                series={[
                  {
                    data: [
                      stats.previous.total_calories,
                      stats.current.total_calories,
                    ],
                  },
                ]}
                colors={["black"]}
                width={450}
                height={450}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black p-12 pl-14">
              <div className="text-[13px]">
                <span>Today's Protein Intake is </span>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_protein,
                    stats.current.total_protein
                  );

                  return (
                    <span className={percentage.color}>{percentage.str}</span>
                  );
                })()}
                <span>than yesterday's</span>
              </div>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Yesterday", "Today"] }]}
                series={[
                  {
                    data: [
                      stats.previous.total_protein,
                      stats.current.total_protein,
                    ],
                  },
                ]}
                colors={["#FFC107"]}
                width={450}
                height={450}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black p-12 pl-14">
              <div className="text-[13px]">
                <span>Today's Fat Intake is </span>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_fat,
                    stats.current.total_fat
                  );

                  return (
                    <span className={percentage.color}>{percentage.str}</span>
                  );
                })()}
                <span>than yesterday's</span>
              </div>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Yesterday", "Today"] }]}
                series={[
                  {
                    data: [stats.previous.total_fat, stats.current.total_fat],
                  },
                ]}
                colors={["#FA605F"]}
                width={450}
                height={450}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black p-12 pl-14">
              <div className="text-[13px]">
                <span>Today's Carb Intake is </span>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_carbs,
                    stats.current.total_carbs
                  );

                  return (
                    <span className={percentage.color}>{percentage.str}</span>
                  );
                })()}
                <span>than yesterday's</span>
              </div>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Yesterday", "Today"] }]}
                series={[
                  {
                    data: [
                      stats.previous.total_carbs,
                      stats.current.total_carbs,
                    ],
                  },
                ]}
                colors={["#539BF8"]}
                width={450}
                height={450}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black p-12 pl-14">
              <div className="text-[13px]">
                <span>Today's Sugar Intake is </span>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_sugar,
                    stats.current.total_sugar
                  );

                  return (
                    <span className={percentage.color}>{percentage.str}</span>
                  );
                })()}
                <span>than yesterday's</span>
              </div>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Yesterday", "Today"] }]}
                series={[
                  {
                    data: [
                      stats.previous.total_sugar,
                      stats.current.total_sugar,
                    ],
                  },
                ]}
                colors={["#AF66F7"]}
                width={450}
                height={450}
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center items-center h-[250px] rounded-md bg-white text-black p-12 pl-14">
              <div className="text-[13px]">
                <span>Today's Fiber Intake is </span>
                {(() => {
                  const percentage = percentageDifference(
                    stats.previous.total_fiber,
                    stats.current.total_fiber
                  );

                  return (
                    <span className={percentage.color}>{percentage.str}</span>
                  );
                })()}
                <span>than yesterday's</span>
              </div>

              <BarChart
                xAxis={[{ scaleType: "band", data: ["Yesterday", "Today"] }]}
                series={[
                  {
                    data: [
                      stats.previous.total_fiber,
                      stats.current.total_fiber,
                    ],
                  },
                ]}
                colors={["#5DC95D"]}
                width={450}
                height={450}
              />
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
