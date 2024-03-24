/* eslint-disable @next/next/no-img-element */
import { extractMealInfoFromImage } from "@/lib/ai";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const ImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800; // Set your desired maximum width here
          const maxHeight = 800; // Set your desired maximum height here
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(image, 0, 0, width, height);
          const resizedImageData = canvas.toDataURL("image/jpeg", 0.7); // Adjust the quality (0.0 - 1.0) as needed
          setImageSrc(resizedImageData);
        };
      };
      reader.readAsDataURL(file);
    }
  };
  const router = useRouter();
  const handleSubmit = async () => {
    if (!imageSrc) return;
    setLoading(true);
    await extractMealInfoFromImage(imageSrc);
    router.push("/dashboard");
    setLoading(false);
  };
  const RenderButton = () => {
    if (!imageSrc) return null;
    if (imageSrc && !loading) {
      return <Button onClick={handleSubmit}>Submit!</Button>;
    }
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Processing
      </Button>
    );
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <Input type="file" accept="image/*" capture onChange={handleFileChange} />
      {imageSrc && (
        <img src={imageSrc} alt="Selected" style={{ height: "300px" }} />
      )}
      <RenderButton />
    </div>
  );
};

export default ImageUploader;
