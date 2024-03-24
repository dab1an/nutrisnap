import { Loader2 } from "lucide-react";
import React from "react";
const LoadingPage = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-center mt-[100px]">
      <h1 className="font-bold text-3xl text-primary">Loading...</h1>
      <Loader2 size={64} className="text-primary animate-spin" />
    </div>
  );
};

export default LoadingPage;
