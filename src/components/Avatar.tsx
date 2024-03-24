/* eslint-disable @next/next/no-img-element */
import React from "react";
const Avatar = ({ email }: { email: string }) => {
  return (
    <img
      src={`https://api.dicebear.com/8.x/initials/svg?seed=${email}&backgroundType=solid,gradientLinear`}
      alt="avatar"
      className="rounded-full w-[60px]"
    />
  );
};

export default Avatar;
