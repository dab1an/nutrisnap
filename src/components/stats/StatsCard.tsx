import { getStats } from "@/lib/data";
import MacroSummary from "./MacroSummary";
import MacroWheel from "./MacroWheel";

const capCalories = 2500;
const capProtien = 500;
const capFat = 450;
const capCarbs = 500;
const capSugar = 300;
const capFiber = 200;

export default async function StatsCard() {
  //   const stats = await getStats("day");

  return (
    <div className="w-full drop-shadow-lg bg-white h-[325px] flex flex-col rounded-md px-4  gap-2">
      <div className="flex items-center w-full gap-6 pt-2 ">
        {/* <div className="flex flex-col">
          <h1 className="text-lg font-extrabold">Daily Cals.</h1>
          <h1 className="font-bold">{stats.total_calories + " cals."}</h1>
          <h1 className="text-[#C3BEBE] font-bold ">
            {Math.max(capCalories - stats.total_calories, 0) + " cals. left"}
          </h1>
        </div> */}
        <MacroWheel />
      </div>
      {/* <div className="flex flex-wrap items-center justify-center gap-6">
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
      </div> */}
    </div>
  );
}
