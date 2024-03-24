/* eslint-disable @next/next/no-img-element */
"use client";
import LoadingPage from "@/components/LoadingPage";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Meal } from "@/types/meal";
import { Stats } from "@/types/queries";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
interface IProgressItemProps {
  title: string;
  value: number;
  progressValue: number;
}

const Page = () => {
  const [meals, setMeals] = useState<Meal[]>();
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    getMeals();
    getStats("day");
  }, []);

  const getMeals = async () => {
    try {
      const response = await fetch(
        //should NOT be hardcoding
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

        setMeals(newRes.meals.rows);
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
          next: { tags: ["stats"] },
          method: "GET",
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
  const { loading, userData } = useUserAuth();
  const NavSpecial = () => {
    const atLoc = userData?.email?.indexOf("@");
    const email = userData?.email?.slice(0, atLoc);
    return (
      <div className="flex flex-col">
        <h1 className="font-extrabold text-[26px] lg:text-[34px]">
          Welcome back,
        </h1>
        <h1 className="font-extrabold text-[26px] lg:text-[34px] text-primary">
          {email}
        </h1>
      </div>
    );
  };

  const router = useRouter();

  if (loading) return <LoadingPage />;
  if (!loading && !userData) {
    router.push("/login");
  }

  console.log(stats);
  return (
    <div className="container lg:pt-14 lg:px-52  lg:flex lg:flex-col lg:items-center">
      <Navbar special={NavSpecial} />
      <div className="relative w-full -z-10 lg:w-[500px]">
        <VictoryPie
          colorScale={["gray", "#2463EB"]}
          data={[
            { x: "total", y: 2500 },
            {
              x: "blue",
              y: stats?.current.total_calories,
            },
          ]}
          startAngle={90}
          endAngle={-90}
          innerRadius={100}
          labels={() => ""}
        />
        <div className="absolute font-bold  inset-0 w-fit h-5 mx-auto my-auto -top-32 flex flex-col items-center">
          <p className="font-bold text-3xl lg:text-5xl">
            {stats ? stats.current.total_calories : 0}
          </p>
          <p className="font-bold lg:text-2xl">/ 2500 cal</p>
        </div>
      </div>
      <div className="-mt-28 lg:-mt-52 w-full z-10">
        {meals?.map((meal, index) => {
          const previousMeal = meals[index - 1];
          const currentDate = new Date(meal.created_at);
          const previousDate = previousMeal
            ? new Date(previousMeal.created_at)
            : null;

          // Check if there is a next meal and if the day of the next meal is different from the current one
          const isNewDay =
            !previousMeal ||
            (previousDate && currentDate.getDate() !== previousDate.getDate());

          return (
            <React.Fragment key={index}>
              {isNewDay && (
                <h1 className="font-extrabold text-[20px] mt-5 lg:mt-8">
                  {currentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h1>
              )}

              <FoodCard meal={meal} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

const ProgressItem = ({ title, value, progressValue }: IProgressItemProps) => {
  const MACRO_COLOR_MAP: { [key: string]: string } = {
    Calories: "[&>*]:bg-red-500",
    Protein: "[&>*]:bg-blue-500",
    Carbs: "[&>*]:bg-yellow-500",
    Fat: "[&>*]:bg-green-500",
    Fiber: "[&>*]:bg-purple-500",
    Sugar: "[&>*]:bg-pink-500",
  };

  let color = MACRO_COLOR_MAP[title] || "bg-gray-500";

  return (
    <div className="flex flex-col gap-[0.5px]">
      <span>
        <span>{title}</span>
        <span> • </span>
        {title === "Calories" ? (
          <span>{value + "cal"}</span>
        ) : (
          <span>{value + "g"}</span>
        )}
      </span>
      <Progress value={progressValue} className={`h-[3px] ${color}`} />
    </div>
  );
};

export const FoodCard = ({ meal }: { meal: Meal }) => {
  const { name, calories, protein, carbs, fat, fiber, sugar, img, created_at } =
    meal;
  const time = new Date(created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [showCalories, setShowCalories] = useState(false);

  const imageUrl = Buffer.from((img as any).data).toString();

  const handleShowCalories = () => {
    setShowCalories(!showCalories);
  };

  return (
    <Accordion
      type="single"
      collapsible
      onClick={handleShowCalories}
      className="drop-shadow-xl"
    >
      <AccordionItem value="item-1" className="w-full">
        <AccordionTrigger className="flex justify-between items-center w-full gap-2">
          <div className="flex w-full justify-between">
            <p className="text-start font-thin text-[17px]">{name}</p>
            {!showCalories ? <p className="">{calories} Cal</p> : <p>{time}</p>}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-3 items-center">
            <img
              className="w-[185px] h-[140px] rounded-md object-cover"
              src={imageUrl}
              alt=""
            />
            <div className="flex flex-col justify-between w-full  gap-[0.5px] text-[11px]">
              <ProgressItem
                title={"Calories"}
                value={calories}
                progressValue={Math.floor((100 * calories) / 2500)}
              />
              <ProgressItem
                title={"Protein"}
                value={protein}
                progressValue={Math.floor((100 * protein) / 130)}
              />
              <ProgressItem
                title={"Carbs"}
                value={carbs}
                progressValue={Math.floor((100 * carbs) / 280)}
              />
              <ProgressItem
                title={"Fat"}
                value={fat}
                progressValue={Math.floor((100 * fat) / 60)}
              />
              <ProgressItem
                title={"Fiber"}
                value={fiber}
                progressValue={Math.floor((100 * fiber) / 38)}
              />
              <ProgressItem
                title={"Sugar"}
                value={sugar}
                progressValue={Math.floor((100 * sugar) / 56)}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
