"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { extractMealInfoFromImage } from "@/lib/ai";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { ArrowLeft, Camera, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FoodCard } from "../dashboard/page";
const Page = () => {
  const NavBarSpecial = () => {
    return (
      // <a>
      //   <p className="font-bold text-2xl">Welcome Back,</p>
      //   <p className="text-primary font-bold text-2xl">Jacob</p>
      // </a>
      <a href="/">
        <ArrowLeft />
      </a>
    );
  };
  return (
    <div className="container flex flex-col gap-10 items-center">
      <Navbar special={NavBarSpecial} />
      <CustomWebcam />
    </div>
  );
};

export default Page;

export const CustomWebcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [retakeState, setRetakeState] = useState<boolean>(false);
  const { loading, userData } = useUserAuth();
  const router = useRouter();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }, []);

  const capture = useCallback(async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL("image/png");
        setImgSrc(imageSrc);
        console.log(imageSrc);
        const response = await extractMealInfoFromImage(imageSrc);
        // console.log(response);
        // setImageData(JSON.stringify(response, null, 2));
      }
    }
  }, []);

  const retake = () => {
    setImgSrc(null);
    setRetakeState(!retakeState);
  };

  useEffect(() => {
    startCamera();
  }, [startCamera, retakeState]);
  if (loading) return <div>Loading...</div>;
  if (!loading && !userData) {
    router.push("/login");
  }
  return (
    <div className="flex flex-col items-center gap-10">
      {imgSrc ? (
        <img src={imgSrc} alt="your webcam image" />
      ) : (
        <video ref={videoRef} autoPlay muted className="rounded-lg"></video>
      )}
      <p className="text-center w-4/5">
        Make sure all food is in frame and take photo when ready
      </p>
      {!imgSrc ? (
        <Button className="rounded-full w-[70px] h-[70px]" onClick={capture}>
          <Camera size={35} />
        </Button>
      ) : (
        <Button onClick={retake}>Retake</Button>
      )}
      {imgSrc && !imageData && <p>Processing...</p>}
      {imageData && <pre>{imageData}</pre>}
    </div>
  );
};
