"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatsCard from "@/components/stats/StatsCard";

export default function page() {
  return (
    <div className="container pt-12 flex flex-col  justify-center gap-6">
      <div className="w-full mb-2">
        <Navbar special={ProfilePhoto} />
      </div>

      <TopFoodCard />
      <StatsCard />
      {/* <div className="overflow-y-scroll">
        <FoodCard calories={200} carbs={200} />
        <FoodCard calories={200} carbs={200} />
        <FoodCard calories={200} carbs={200} />
      </div> */}
    </div>
  );
}

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
