"use client";
import { BarChart3, Camera, Home, LayoutDashboard } from "lucide-react";
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
      icon: LayoutDashboard,
      name: "Dashboard",
      route: "/dashboard",
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
    <div className="fixed bg-background bottom-0 w-full border-t-2 border-foreground/40 h-fit flex items-center justify-evenly pb-[30px] pt-[20px]">
      {items.map((item) => {
        return (
          <a href={item.route} className="cursor-pointer" key={item.name}>
            <item.icon
              key={item.name}
              size={35}
              className={`${
                pathname === item.route ? "" : "text-muted-foreground"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
};

export default BottomNav;
