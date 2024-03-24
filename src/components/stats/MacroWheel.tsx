import { getMeals, getStats } from "@/lib/data";
import { Stats } from "@/types/queries";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default async function MacroWheel() {
  // console.log(await getStats("day"));
  await getMeals();
  const stats = {};
  //   const stats = await getStats("day");

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
}
