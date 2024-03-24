"use client";
/* eslint-disable @next/next/no-img-element */

import LoadingPage from "@/components/LoadingPage";
import Navbar from "@/components/Navbar";
import ImageUploader from "@/components/image-taker";
import { Button } from "@/components/ui/button";
import { extractMealInfoFromImage } from "@/lib/ai";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { ArrowLeft, Camera, Menu } from "lucide-react";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FoodCard } from "../dashboard/page";

const Page = () => {
  const NavBarSpecial = () => {
    return (
      <a href="/">
        <ArrowLeft />
      </a>
    );
  };
  const router = useRouter();
  const { userData, loading } = useUserAuth();
  if (loading) return <LoadingPage />;
  if (!loading && !userData) {
    router.push("/login");
  }
  return (
    <div className="container flex flex-col gap-5 items-center">
      <Navbar special={NavBarSpecial} />
      <h1 className="text-4xl font-bold text-primary">Take a Picture!</h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-center">
          Take a picture of your meal and {"we'll"} analyze it to provide you
          with nutritional information
        </p>
        <p className="text-foreground/50 text-sm text-center">
          Click on the box below to get started. Make sure all food is in frame!
        </p>
      </div>
      <ImageUploader />
      {/* <CustomWebcam /> */}
    </div>
  );
};

export default Page;
