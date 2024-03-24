import { getStats } from "@/lib/data";
import React, { useEffect, useState } from "react";
import MacroSummary from "./MacroSummary";
import MacroWheel from "./MacroWheel";
const capCalories = 2500;
const capProtien = 500;
const capFat = 450;
const capCarbs = 500;
const capSugar = 300;
const capFiber = 200;

export default function StatsCard() {
  //   const stats = await getStats("day");
  const [mealRes, setMealRes] = useState<object[]>();
  const [stats, setStats] = useState<object>();
  useEffect(() => {
    getMeals();
    getStats("day");
  }, []);
  const getMeals = async () => {
    try {
      const response = await fetch(
        `/auth/get-meals?email=${"jschuster8765@gmail.com"}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const newRes = data;
        console.log(newRes.meals.rows);
        setMealRes(newRes.meals.rows);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
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
  if (!stats) return <div>Loading...</div>;
  return (
    <div className="w-full bg-foreground/5 h-[325px] flex flex-col rounded-md px-4  gap-2">
      <div className="flex items-center w-full gap-6 pt-2 ">
        <div className="flex flex-col">
          <h1 className="text-lg font-extrabold">Daily cals.</h1>
          <h1 className="font-bold">{stats.total_calories + " cals."}</h1>
          <h1 className="text-[#C3BEBE] font-bold ">
            {Math.max(capCalories - stats.total_calories, 0) + " cals. left"}
          </h1>
        </div>
        <MacroWheel stats={stats ? stats : {}} />
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
  );
}
