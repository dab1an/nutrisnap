"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { VictoryPie } from "victory";

interface IProgressItemProps {
  title: string;
  value: number;
  progressValue: number;
}

interface IFoodCardProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}
const mockData = [
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-24T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-23T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-22T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-21T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-21T01:22:59.270Z",
  },
];
function extractDateInfo(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Note: Month is zero-indexed
  const day = date.getDate();

  return { year, month, day };
}
const page = () => {
  return (
    <div className="container">
      <h1>Welcome back,</h1>
      <h1>Jacob</h1>
      <div className="relative w-full -z-10">
        <VictoryPie
          colorScale={["gray", "#539BF8"]}
          data={[
            { x: "gray", y: 35 },
            { x: "blue", y: 40 },
          ]}
          startAngle={90}
          endAngle={-90}
          innerRadius={100}
          labels={() => ""}
        />
        <div className="absolute font-bold  inset-0 w-fit h-5 mx-auto my-auto -top-32 flex flex-col items-center">
          <p className="font-bold text-3xl">1754</p>
          <p className="font-bold text-2x">/ 2500 cal</p>
        </div>
      </div>
      <div className="-mt-28 w-full z-10">
        {mockData.map((data) => {
          let prevDate = extractDateInfo(mockData[0].created_at);
          return (
            <div key={data.created_at}>
              {extractDateInfo(data.created_at).day !== prevDate.day && (
                <h1 className="font-extrabold text-[20px]">
                  {"Today's Stats"}
                </h1>
              )}
              <FoodCard
                key={data.created_at}
                name={data.name}
                calories={data.calories}
                protein={data.protein}
                carbs={data.carbs}
                fat={data.fat}
                fiber={data.fiber}
                sugar={data.sugar}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

const ProgressItem = ({ title, value, progressValue }: IProgressItemProps) => {
  return (
    <div className="flex flex-col gap-[0.5px]">
      <span>
        <span>{title}</span>
        <span> • </span>
        {title === "Calories" ? (
          <span>{value + "cal"}</span>
        ) : (
          <span>{value + "g"}</span>
        )}
      </span>
      <Progress value={progressValue} className="h-[3px] " />
    </div>
  );
};

export const FoodCard = ({
  name,
  calories,
  protein,
  carbs,
  fat,
  fiber,
  sugar,
}: IFoodCardProps) => {
  const [showCalories, setShowCalories] = useState(false);

  const handleShowCalories = () => {
    setShowCalories(!showCalories);
  };
  return (
    <Accordion type="single" collapsible onClick={handleShowCalories}>
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="flex justify-between items-center w-full gap-2">
          <div className="flex w-full justify-between">
            <p>{name}</p>
            {!showCalories ? <p className="">{calories} Cal</p> : <p>2:30pm</p>}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-3 items-center">
            <img
              className="w-[185px] h-[140px] rounded-md"
              src={"https://via.placeholder.com/150"}
              alt=""
            />
            <div className="flex flex-col justify-between w-full  gap-[0.5px] text-[11px]">
              <ProgressItem
                title={"Calories"}
                value={calories}
                progressValue={0}
              />
              <ProgressItem
                title={"Protein"}
                value={protein}
                progressValue={0}
              />
              <ProgressItem title={"Carbs"} value={carbs} progressValue={0} />
              <ProgressItem title={"Fat"} value={fat} progressValue={0} />
              <ProgressItem title={"Fiber"} value={fiber} progressValue={0} />
              <ProgressItem title={"Sugar"} value={sugar} progressValue={0} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
