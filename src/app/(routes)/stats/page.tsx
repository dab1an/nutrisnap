"use client";
import Avatar from "@/components/Avatar";
import LoadingPage from "@/components/LoadingPage";
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
import { Stats } from "@/types/queries";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import React, { useEffect, useState } from "react";
export default function Page() {
  const [macroType, setMacroType] = useState<string>("protein");
  const [stats, setStats] = useState<Stats>();
  const handleChangeMacroType = (type: string) => {
    setMacroType(type);
  };
  const { userData, loading } = useUserAuth();
  const atLoc = userData?.email?.indexOf("@");
  const email = userData?.email?.slice(0, atLoc);

  useEffect(() => {
    console.log("use effect");
    getStats("day");
  }, []);

  const getStats = async (period: string) => {
    console.log("getting stats");
    try {
      const response = await fetch(
        `/auth/get-stats?email=jschuster8765@gmail.com&period=${period}`,
        {
          method: "GET",
          next: { tags: ["stats"] },
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setStats(res.data as Stats);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (!stats || loading) return <LoadingPage />;

  const ProfilePhoto = () => {
    if (loading) return <LoadingPage />;
    return (
      <div className=" flex items-center justify-between gap-3">
        <Avatar email="alexvera@gmail.com" />
        <div className="flex flex-col font-bold text-sm">
          <p>Hey {email},</p>
          <p>Today is {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="container flex flex-col justify-center items-center gap-6 pb-20">
      <div className="w-full mb-2">
        <Navbar special={ProfilePhoto} />
      </div>
      <StatsCard stats={stats} />
      <TopFoodCard handleChangeMacroType={handleChangeMacroType} />
      <TopFoodCards macroType={macroType} />
      <CompareCard stats={stats} />
    </div>
  );
}

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
