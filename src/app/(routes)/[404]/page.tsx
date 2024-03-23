"use client";
import { Button } from "@/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex gap-3 flex-col h-[500px] items-center justify-center  ">
      <h2 className="text-6xl font-bold text-primary">404</h2>
      <h3 className="text-xl">OOPS! PAGE NOT FOUND</h3>
      <p className="text-center">
        The page does not exist or was removed! We suggest you back to home.
      </p>
      <a href="/">
        <Button className="font-bold">Back to Home</Button>
      </a>
    </div>
  );
}
