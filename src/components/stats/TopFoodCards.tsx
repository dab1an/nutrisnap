import React from "react";
import { useState, useEffect } from "react";
import { FoodCard } from "@/app/(routes)/dashboard/page";

interface IFoodCardProps {
  macroType: string;
}
const TopFoodCards = ({ macroType }: IFoodCardProps) => {
  const [mealRes, setMealRes] = useState<object[]>();

  useEffect(() => {
    getMeals();
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

  const getTopThreeHighMacroMeals = (): object[] => {
    if (!mealRes) {
      return [];
    }
    const sortedMeals = [...mealRes].sort(
      (a: any, b: any) => parseFloat(b.macroType) - parseFloat(a.macroType)
    );
    return sortedMeals.slice(0, 3);
  };

  return (
    <>
      {getTopThreeHighMacroMeals().map((meal: any, index: number) => (
        <FoodCard
          key={index}
          name={meal.name}
          calories={meal.calories}
          protein={meal.protein}
          carbs={meal.carbs}
          fat={meal.fat}
          fiber={meal.fiber}
          sugar={meal.sugar}
        />
      ))}
    </>
  );
};

export default TopFoodCards;
