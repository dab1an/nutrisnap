"use client";
import { Link } from "lucide-react";
import React from "react";
import { getMeals, getStats } from "@/lib/data";

async function page() {
  const stats = await getStats("day");

  return (
    <div>
      <Link size={32} href="/">
        Home
      </Link>

      <h1>Stats</h1>

      {JSON.stringify(stats, null, 2)}
    </div>
  );
}

export default page;
