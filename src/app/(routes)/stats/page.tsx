"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FoodCard } from "../dashboard/page";

interface IMacroSummaryProps {
  title: string;
  curr: number;
  left: number;
}

import { getStats } from "@/lib/data";

async function page() {
  const stats = await getStats("day");
  console.log(stats);
  return <p>{JSON.stringify(stats)}</p>;

  return (
    <div className="container pt-12 flex flex-col  justify-center gap-6">
      <div className="w-full mb-2">
        <Navbar special={ProfilePhoto} />
      </div>
      <div className="w-full drop-shadow-lg bg-white h-[325px] flex flex-col rounded-md px-4  gap-2">
        <div className="flex items-center w-full gap-6 pt-2 ">
          <div className="flex flex-col">
            <h1 className="text-lg font-extrabold">Daily Cals.</h1>
            <h1 className="font-bold">1043 cal</h1>
            <h1 className="text-[#C3BEBE] font-bold ">703 cal left</h1>
          </div>
          <MacroWheel />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <MacroSummary title="Protein" curr={200} left={400} />
          <MacroSummary title="Fat" curr={200} left={400} />
          <MacroSummary title="Carbs" curr={200} left={400} />
          <MacroSummary title="Sugar" curr={200} left={400} />
          <MacroSummary title="Fiber" curr={200} left={400} />
        </div>
      </div>
      <TopFoodCard />
      <div className="overflow-y-scroll">
        <FoodCard calories={200} carbs={200} />
        <FoodCard calories={200} carbs={200} />
        <FoodCard calories={200} carbs={200} />
      </div>
    </div>
  );
}

export const MacroWheel = () => {
  return (
    <div className="relative flex items-center h-44 w-44 justify-center">
      <CircularProgressbar
        className="h-[30px] absolute"
        value={40}
        text={""}
        strokeWidth={14}
        styles={buildStyles({
          pathColor: "#5ec95d",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[60px] absolute"
        value={66}
        text={""}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "#AF67F7",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[90px] absolute"
        value={66}
        text={""}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: "#539BF8",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[120px] absolute"
        value={66}
        text={""}
        strokeWidth={6}
        styles={buildStyles({
          pathColor: "#FA6060",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[150px] absolute"
        value={66}
        text={""}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: "#FEC32A",
          trailColor: "#C3BEBE",
        })}
      />
    </div>
  );
};

export const MacroSummary = ({ title, curr, left }: IMacroSummaryProps) => {
  let dotColor = "";
  switch (title) {
    case "Protein":
      dotColor = "bg-[#FEC32A]";
      break;
    case "Fat":
      dotColor = "bg-[#FA6060]";
      break;
    case "Carbs":
      dotColor = "bg-[#539BF8]";
      break;
    case "Sugar":
      dotColor = "bg-[#AF67F7]";
      break;
    case "Fiber":
      dotColor = "bg-[#5ec95d]";
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <div className={`rounded-full  h-1 p-1 ${dotColor}`}> </div>
        <div className="text-sm">{title}</div>
      </div>
      <div className="text-[#C3BEBE]">
        <span className="text-[9.5px]">{curr + "g"}</span>
        <span className="text-sm"> • </span>
        <span className="text-[9.5px]">{curr + "g left"}</span>
      </div>
    </div>
  );
};
export const ProfilePhoto = (img: string) => {
  return (
    <div className=" flex items-center justify-between gap-3">
      <img
        className="h-[60px] rounded-full"
        src="https://media.licdn.com/dms/image/D4E35AQHGlbhv55wH9A/profile-framedphoto-shrink_800_800/0/1686157578276?e=1711839600&v=beta&t=hZr-se8W3rP2Kvdv12ZOrr42uhppsRq21aaEIeOeU9I"
        alt=""
      />
      <div className="flex flex-col font-bold text-sm">
        <p>Hey Jacob,</p>
        <p>Today is October 16</p>
      </div>
    </div>
  );
};

export const TopFoodCard = () => {
  return (
    <div className="flex flex-start">
      <div className="flex items-center gap-2">
        <h1 className="font-extrabold text-xl"> Your top foods for </h1>
        <Select>
          <SelectTrigger className="font-extrabold text-xl w-[130px]">
            <SelectValue placeholder="Protein" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Protein</SelectItem>
            <SelectItem value="dark">Fat</SelectItem>
            <SelectItem value="system">Carbs</SelectItem>
            <SelectItem value="dark">Sugar</SelectItem>
            <SelectItem value="dark">Fiber</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default page;
