"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { getStats } from "@/lib/data";
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
import { Stats } from "@/types/queries";

interface IMacroSummaryProps {
  title: string;
  curr: number;
  left: number;
}

async function page() {
  const stats = await getStats("day");
  // return <p>{JSON.stringify(stats_raw)}</p>;

  console.log(stats);

  const capCalories = 2500;
  const capProtien = 500;
  const capFat = 450;
  const capCarbs = 500;
  const capSugar = 300;
  const capFiber = 200;

  return (
    <div className="container pt-12 flex flex-col  justify-center gap-6">
      <div className="w-full mb-2">
        <Navbar special={ProfilePhoto} />
      </div>
      <div className="w-full drop-shadow-lg bg-white h-[325px] flex flex-col rounded-md px-4  gap-2">
        <div className="flex items-center w-full gap-6 pt-2 ">
          <div className="flex flex-col">
            <h1 className="text-lg font-extrabold">Daily Cals.</h1>
            <h1 className="font-bold">{stats.total_calories + " cals."}</h1>
            <h1 className="text-[#C3BEBE] font-bold ">
              {Math.max(capCalories - stats.total_calories, 0) + " cals. left"}
            </h1>
          </div>
          <MacroWheel stats={stats} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <MacroSummary
            title="Protein"
            curr={stats.total_protein}
            left={capProtien - stats.total_protein}
          />
          <MacroSummary
            title="Fat"
            curr={stats.total_fat}
            left={capFat - stats.total_fat}
          />
          <MacroSummary
            title="Carbs"
            curr={stats.total_carbs}
            left={capCarbs - stats.total_carbs}
          />
          <MacroSummary
            title="Sugar"
            curr={stats.total_sugar}
            left={capSugar - stats.total_sugar}
          />
          <MacroSummary
            title="Fiber"
            curr={stats.total_fiber}
            left={capFiber - stats.total_fiber}
          />
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

export const MacroWheel = ({ stats }: { stats: Stats }) => {
  return (
    <div className="relative flex items-center h-44 w-44 justify-center">
      <CircularProgressbar
        className="h-[30px] absolute"
        value={Math.floor((stats.total_fiber / 200) * 100)}
        text={""}
        strokeWidth={14}
        styles={buildStyles({
          pathColor: "#5ec95d",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[60px] absolute"
        value={Math.floor((stats.total_sugar / 300) * 100)}
        text={""}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "#AF67F7",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[90px] absolute"
        value={Math.floor((stats.total_carbs / 500) * 100)}
        text={""}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: "#539BF8",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[120px] absolute"
        value={Math.floor((stats.total_fat / 450) * 100)}
        text={""}
        strokeWidth={6}
        styles={buildStyles({
          pathColor: "#FA6060",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[150px] absolute"
        value={Math.floor((stats.total_protein / 500) * 100)}
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
        <span className="text-[9.5px]">{Math.max(left, 0) + "g left"}</span>
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
            <SelectItem value="dark">Protein</SelectItem>
            <SelectItem value="dark">Fat</SelectItem>
            <SelectItem value="dark">Carbs</SelectItem>
            <SelectItem value="dark">Sugar</SelectItem>
            <SelectItem value="dark">Fiber</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default page;
