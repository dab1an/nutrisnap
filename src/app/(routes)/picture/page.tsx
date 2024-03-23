"use client";
import { Button } from "@/components/ui/button";
import { extractMealInfoFromImage } from "@/lib/ai";
import { ArrowLeft, Camera, Menu } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Page = () => {
  return (
    <div className="container flex flex-col gap-10 items-center">
      <div className="flex w-full justify-between">
        <ArrowLeft />
        <Menu />
      </div>
      <CustomWebcam />

      <a href="/" className="bg-red-500 text-white font-bold p-2 text-center">
        Home
      </a>
    </div>
  );
};

export default Page;

export const CustomWebcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [retakeState, setRetakeState] = useState<boolean>(false);
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
        const response = await extractMealInfoFromImage(imageSrc);
        setImageData(JSON.stringify(response, null, 2));
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
