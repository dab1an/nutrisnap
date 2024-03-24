"use client";
import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";
import CompareCard from "@/components/stats/CompareCard";
import StatsCard from "@/components/stats/StatsCard";
import TopFoodCards from "@/components/stats/TopFoodCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
export default function Page() {
  const [macroType, setMacroType] = useState<string>("protein");
  const handleChangeMacroType = (type: string) => {
    setMacroType(type);
  };

  return (
    <div className="container pt-12 flex flex-col  justify-center items-center gap-6">
      <div className="w-full mb-2">
        <Navbar special={ProfilePhoto} />
      </div>
      <StatsCard />
      <TopFoodCard handleChangeMacroType={handleChangeMacroType} />
      <TopFoodCards macroType={macroType} />
      <CompareCard />
    </div>
  );
}

export const ProfilePhoto = (img: string) => {
  return (
    <div className=" flex items-center justify-between gap-3">
      <Avatar email="alexvera@gmail.com" />
      <div className="flex flex-col font-bold text-sm">
        <p>Hey Jacob,</p>
        <p>Today is October 16</p>
      </div>
    </div>
  );
};

export const TopFoodCard = ({
  handleChangeMacroType,
}: {
  handleChangeMacroType: (type: string) => void;
}) => {
  return (
    <div className="flex flex-start w-full justfiy">
      <div className="flex items-center gap-2">
        <h1 className="font-extrabold text-xl"> Your top foods for </h1>
        <Select onValueChange={(val) => handleChangeMacroType(val)}>
          <SelectTrigger className="font-extrabold text-xl w-[130px]">
            <SelectValue placeholder="Protein" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="protein">protein</SelectItem>
            <SelectItem value="fat">fat</SelectItem>
            <SelectItem value="carbs">carbs</SelectItem>
            <SelectItem value="sugar">sugar</SelectItem>
            <SelectItem value="fiber">fiber</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
