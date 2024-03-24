"use client";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
interface IProgressItemProps {
  title: string;
  value: number;
  progressValue: number;
}

interface IFoodCardProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}
const mockData = [
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-24T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-23T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-22T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-21T01:25:59.270Z",
  },
  {
    name: "Hamburger",
    calories: 200,
    protein: 300,
    carbs: 3400,
    fat: 39,
    fiber: 293,
    sugar: 223,
    created_at: "2024-03-21T01:22:59.270Z",
  },
];
function extractDateInfo(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Note: Month is zero-indexed
  const day = date.getDate();

  return { year, month, day };
}
const Page = () => {
  // const [meals, setMeals] = useState<object[]>();
  const [stats, setStats] = useState<object>();
  const meals = [
    {
      id: "3bd84fcb-23ad-45fa-abe8-2df76d5fd3d1",
      name: "Oatmeal with Blueberries",
      calories: 300,
      protein: "10",
      carbs: "50",
      fat: "5",
      fiber: "8",
      sugar: "15",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "fe762761-f2ef-40f1-9d13-4aa00da38f95",
      name: "Grilled Chicken Salad",
      calories: 450,
      protein: "35",
      carbs: "20",
      fat: "18",
      fiber: "5",
      sugar: "10",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Restaurant",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "c9209c8b-6691-4385-b102-c40f2e2c0172",
      name: "Beef Stir-fry with Rice",
      calories: 550,
      protein: "30",
      carbs: "60",
      fat: "20",
      fiber: "5",
      sugar: "8",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "11115232-8937-46fa-b113-c13e75cd0c4d",
      name: "Veggie Omelet",
      calories: 280,
      protein: "18",
      carbs: "12",
      fat: "16",
      fiber: "3",
      sugar: "6",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "5b512a82-e38f-4c29-808b-c90367e0f11a",
      name: "Grilled Salmon with Asparagus",
      calories: 400,
      protein: "35",
      carbs: "15",
      fat: "18",
      fiber: "6",
      sugar: "3",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "b6f71172-44a7-4872-bfbe-9b7585d6ff9f",
      name: "Chicken Caesar Wrap",
      calories: 520,
      protein: "30",
      carbs: "40",
      fat: "25",
      fiber: "4",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Work",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "e10e372d-518f-4c59-9897-0e5db0228eaa",
      name: "Pasta Primavera",
      calories: 600,
      protein: "20",
      carbs: "90",
      fat: "18",
      fiber: "8",
      sugar: "12",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "9ac44455-a3a1-4a12-96b2-56c93039c7c7",
      name: "Greek Salad with Feta",
      calories: 350,
      protein: "15",
      carbs: "18",
      fat: "25",
      fiber: "6",
      sugar: "8",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Restaurant",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "c7181d38-78d6-464a-bb72-5f79725052d6",
      name: "Beef Tacos",
      calories: 550,
      protein: "30",
      carbs: "45",
      fat: "25",
      fiber: "8",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "db0d5bb0-ef69-49a8-9ebc-d190504ea703",
      name: "Grilled Chicken Sandwich",
      calories: 480,
      protein: "35",
      carbs: "40",
      fat: "18",
      fiber: "4",
      sugar: "6",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Restaurant",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "82fcca0f-1f13-4e7e-9d7e-e93a60453f84",
      name: "Vegetable Stir-fry with Tofu",
      calories: 400,
      protein: "18",
      carbs: "50",
      fat: "15",
      fiber: "10",
      sugar: "8",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "6b754412-a9b5-47e9-9b78-0f448b4e174b",
      name: "Turkey Burger with Sweet Potato Fries",
      calories: 550,
      protein: "30",
      carbs: "45",
      fat: "25",
      fiber: "8",
      sugar: "10",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "42558c9e-faff-46c4-a57d-fda37b8a64f8",
      name: "Sushi Rolls",
      calories: 500,
      protein: "25",
      carbs: "60",
      fat: "10",
      fiber: "3",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Restaurant",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "72d153e3-7851-4212-8cab-e199a4469a74",
      name: "Chicken Fajitas",
      calories: 550,
      protein: "35",
      carbs: "45",
      fat: "20",
      fiber: "8",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "9bde366f-55a5-4792-91b4-4c5efba055c1",
      name: "Spinach Salad with Grilled Shrimp",
      calories: 400,
      protein: "30",
      carbs: "20",
      fat: "15",
      fiber: "6",
      sugar: "8",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Restaurant",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "973b2a48-ffd5-4a8e-b9a5-b048bda9734b",
      name: "Beef and Broccoli",
      calories: 500,
      protein: "35",
      carbs: "40",
      fat: "20",
      fiber: "6",
      sugar: "8",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "7855c3ee-ca34-4766-885b-460d155ecfc5",
      name: "Turkey Chili",
      calories: 400,
      protein: "30",
      carbs: "40",
      fat: "12",
      fiber: "10",
      sugar: "8",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "ad121f96-e262-4e61-a6e5-ec43eb0f0d6d",
      name: "Grilled Vegetable Skewers",
      calories: 250,
      protein: "10",
      carbs: "30",
      fat: "10",
      fiber: "8",
      sugar: "15",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "c3802a70-5014-44ef-9b27-7a55e0187f3a",
      name: "Chicken Caesar Salad",
      calories: 500,
      protein: "35",
      carbs: "20",
      fat: "25",
      fiber: "5",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Restaurant",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "d848c3cc-3951-4828-8099-21d5e47b4842",
      name: "Quinoa and Black Bean Burrito Bowl",
      calories: 450,
      protein: "20",
      carbs: "60",
      fat: "15",
      fiber: "12",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-24T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
    {
      id: "d848c3cc-3951-4828-8099-21d5e47b4842",
      name: "Quinoa and Black Bean Burrito Bowl",
      calories: 450,
      protein: "20",
      carbs: "60",
      fat: "15",
      fiber: "12",
      sugar: "5",
      img: {
        type: "Buffer",
        data: [255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 96, 0],
      },
      created_at: "2024-03-22T08:32:14.619Z",
      location: "Home",
      user_email: "jschuster8765@gmail.com",
    },
  ];

  useEffect(() => {
    // getMeals();
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
  const NavSpecial = () => {
    return (
      <div className="flex flex-col">
        <h1 className="font-extrabold text-[26px]">Welcome back,</h1>
        <h1 className="font-extrabold text-[26px] text-primary">Jacob</h1>
      </div>
    );
  };
  const router = useRouter();
  const { loading, userData } = useUserAuth();
  const [currentDate, setCurrentDate] = useState(null);

  if (loading) return <div>Loading...</div>;
  if (!loading && !userData) {
    router.push("/login");
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const groupMealsByDay = (meals) => {
    const groupedMeals = [];

    let currentDay = null;
    let mealsOfDay = null;

    meals.forEach((meal) => {
      const mealDate = extractDateInfo(meal.created_at);

      // If it's a new day, create a new group with date information
      if (
        !currentDay ||
        currentDay.day !== mealDate.day ||
        currentDay.month !== mealDate.month ||
        currentDay.year !== mealDate.year
      ) {
        // If there were meals from a previous day, push them to the groupedMeals array
        if (mealsOfDay) {
          groupedMeals.push({ date: currentDay, meals: mealsOfDay });
        }

        // Reset meals of the day and update current day
        mealsOfDay = [];
        currentDay = mealDate;
      }

      // Add the meal to the current day's meals
      mealsOfDay.push(meal);
    });

    // Push the last group of meals
    if (mealsOfDay) {
      groupedMeals.push({ date: currentDay, meals: mealsOfDay });
    }

    return groupedMeals;
  };
  const groupedMeals = groupMealsByDay(meals);
  console.log(groupedMeals);
  return (
    <div className="container pt-5">
      <Navbar special={NavSpecial} />
      <div className="relative w-full -z-10">
        <VictoryPie
          colorScale={["gray", "#539BF8"]}
          data={[
            { x: "total", y: 10500 },
            { x: "blue", y: stats ? stats.total_calories : 0 },
          ]}
          startAngle={90}
          endAngle={-90}
          innerRadius={100}
          labels={() => ""}
        />
        <div className="absolute font-bold  inset-0 w-fit h-5 mx-auto my-auto -top-32 flex flex-col items-center">
          <p className="font-bold text-3xl">
            {stats ? stats.total_calories : 0}
          </p>
          <p className="font-bold text-2x">/ 2500 cal</p>
        </div>
      </div>
      <div className="-mt-28 w-full z-10">
        {groupedMeals.map((group, index) => (
          <div key={index}>
            <h1 className="font-extrabold text-[20px] mt-5">
              {group.date.year === new Date().getFullYear() &&
              group.date.month === new Date().getMonth() + 1 &&
              group.date.day === new Date().getDate()
                ? "Today's Stats"
                : `${monthNames[group.date.month - 1]} ${group.date.day}, ${
                    group.date.year
                  }`}
            </h1>
            {group.meals.map((meal) => (
              <FoodCard
                key={meal.id}
                name={meal.name}
                calories={meal.calories}
                protein={meal.protein}
                carbs={meal.carbs}
                fat={meal.fat}
                fiber={meal.fiber}
                sugar={meal.sugar}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

const ProgressItem = ({ title, value, progressValue }: IProgressItemProps) => {
  let color = "";
  switch (title) {
    case "Calories":
      color = "[&>*]:bg-red-500";
      break;
    case "Protein":
      color = "[&>*]:bg-blue-500";
      break;
    case "Carbs":
      color = "[&>*]:bg-yellow-500";
      break;
    case "Fat":
      color = "[&>*]:bg-green-500";
      break;
    case "Fiber":
      color = "[&>*]:bg-purple-500";
      break;
    case "Sugar":
      color = "[&>*]:bg-pink-500";
      break;
  }
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

export const FoodCard = ({
  name,
  calories,
  protein,
  carbs,
  fat,
  fiber,
  sugar,
}: IFoodCardProps) => {
  const [showCalories, setShowCalories] = useState(false);

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
            <p className="text-start">{name}</p>
            {!showCalories ? <p className="">{calories} Cal</p> : <p>2:30pm</p>}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex gap-3 items-center">
            <img
              className="w-[185px] h-[140px] rounded-md"
              src={"https://via.placeholder.com/150"}
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
                progressValue={Math.floor((100 * protein) / 600)}
              />
              <ProgressItem
                title={"Carbs"}
                value={carbs}
                progressValue={Math.floor((100 * carbs) / 500)}
              />
              <ProgressItem
                title={"Fat"}
                value={fat}
                progressValue={Math.floor((100 * fat) / 450)}
              />
              <ProgressItem
                title={"Fiber"}
                value={fiber}
                progressValue={Math.floor((100 * fiber) / 200)}
              />
              <ProgressItem
                title={"Sugar"}
                value={sugar}
                progressValue={Math.floor((100 * sugar) / 300)}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
