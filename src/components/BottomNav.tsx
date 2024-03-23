"use client";
import { BarChart3, Camera, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
const BottomNav = () => {
  const items = [
    {
      icon: Home,
      name: "Home",
      route: "/",
    },
    {
      icon: Camera,
      name: "Camera",
      route: "/picture",
    },
    {
      icon: BarChart3,
      name: "Stats",
      route: "/stats",
    },
  ];
  const pathname = usePathname();
  return (
    <div className="absolute bottom-0 w-full border-t-2 border-foreground/40 h-[60px] flex items-center justify-evenly">
      {items.map((item) => {
        return (
          <item.icon
            key={item.name}
            size={35}
            className={`${
              pathname === item.route ? "" : "text-muted-foreground"
            }`}
          />
        );
      })}
    </div>
  );
};

export default BottomNav;
