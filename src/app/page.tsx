import Image from "next/image";
import Link from "next/link";
import { getMeals } from "@/lib/data";

export default async function Home() {
  const meals = await getMeals();

  return (
    <div>
      <h1>App</h1>
      <Link href="/picture">Picture</Link>
      <h2>Meals: {JSON.stringify(meals, null, 2)}</h2>
    </div>
  );
}
