/* eslint-disable @next/next/no-img-element */
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import React from "react";
const Avatar = ({ email }: { email: string }) => {
  const { userData, loading } = useUserAuth();
  return (
    <img
      src={`https://api.dicebear.com/8.x/initials/svg?seed=${userData?.email}&backgroundType=solid,gradientLinear`}
      alt="avatar"
      className="rounded-full w-[60px]"
    />
  );
};

export default Avatar;
