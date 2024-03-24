import { getMeals, getStats } from "@/lib/data";
import { Stats } from "@/types/queries";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
export default function MacroWheel({ stats }: { stats: object }) {
  console.log(stats);
  return (
    <div className="relative flex items-center h-44 w-44 justify-center">
      <CircularProgressbar
        className="h-[30px] absolute"
        value={Math.floor((stats.total_fiber / 38) * 100)}
        text={""}
        strokeWidth={14}
        styles={buildStyles({
          pathColor: "#5ec95d",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[60px] absolute"
        value={Math.floor((stats.total_sugar / 56) * 100)}
        text={""}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "#AF67F7",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[90px] absolute"
        value={Math.floor((stats.total_carbs / 280) * 100)}
        text={""}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: "#539BF8",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[120px] absolute"
        value={Math.floor((stats.total_fat / 60) * 100)}
        text={""}
        strokeWidth={6}
        styles={buildStyles({
          pathColor: "#FA6060",
          trailColor: "#C3BEBE",
        })}
      />
      <CircularProgressbar
        className="h-[150px] absolute"
        value={Math.floor((stats.total_protein / 130) * 100)}
        text={""}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: "#FEC32A",
          trailColor: "#C3BEBE",
        })}
      />
    </div>
  );
}
