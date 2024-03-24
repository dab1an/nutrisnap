import { getStats } from "@/lib/data";
import { Stats } from "@/types/queries";
import React, { useEffect, useState } from "react";
import MacroSummary from "./MacroSummary";
import MacroWheel from "./MacroWheel";
const capCalories = 2500;
const capProtien = 500;
const capFat = 450;
const capCarbs = 500;
const capSugar = 300;
const capFiber = 200;

export default function StatsCard({ stats }: { stats: Stats }) {
  return (
    <div className="w-full bg-foreground/5 flex flex-col rounded-md px-4 pb-[5px] gap-2">
      <div className="flex items-center w-full gap-6 pt-2 ">
        <div className="flex flex-col">
          <h1 className="text-lg font-extrabold">Daily cals.</h1>
          <h1 className="font-bold">
            {stats.current.total_calories + " cals."}
          </h1>
          <h1 className="text-[#C3BEBE] font-bold ">
            {Math.max(capCalories - stats.current.total_calories, 0) +
              " cals. left"}
          </h1>
        </div>
        <MacroWheel stats={stats} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <MacroSummary
          title="Protein"
          curr={stats.current.total_protein}
          left={capProtien - stats.current.total_protein}
        />
        <MacroSummary
          title="Fat"
          curr={stats.current.total_fat}
          left={capFat - stats.current.total_fat}
        />
        <MacroSummary
          title="Carbs"
          curr={stats.current.total_carbs}
          left={capCarbs - stats.current.total_carbs}
        />
        <MacroSummary
          title="Sugar"
          curr={stats.current.total_sugar}
          left={capSugar - stats.current.total_sugar}
        />
        <MacroSummary
          title="Fiber"
          curr={stats.current.total_fiber}
          left={capFiber - stats.current.total_fiber}
        />
      </div>
    </div>
  );
}
