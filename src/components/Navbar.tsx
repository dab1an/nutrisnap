"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  BarChart3,
  Camera,
  Home,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Menu,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ModeToggle } from "./dark-mode";
const Navbar = ({ special: Special }: { special: any }) => {
  const [selected, setSelected] = useState<string>("Home");
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
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { userData, loading } = useUserAuth();
  const pathname = usePathname();
  const handleLogout = async () => {
    console.log("logout");
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    } else {
      if (pathname !== "/") {
        router.push("/");
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex w-full justify-between h-[60px] items-center">
      <Special />
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col items-center gap-3 h-1/5">
            <SheetTitle>NutriSnap</SheetTitle>
            <ModeToggle />
          </SheetHeader>
          <div className="flex flex-col justify-between h-4/5">
            <div className="flex flex-col gap-2">
              {items.map((item) => {
                return (
                  <NavbarRouteButton
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    route={item.route}
                  />
                );
              })}
            </div>
            {userData && (
              <div
                className={`flex p-3 w-full gap-3 rounded-lg cursor-pointer`}
                onClick={handleLogout}
              >
                <LogOut />
                <p className="font-medium">Logout</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;

const NavbarRouteButton = ({
  icon: Icon,
  name,
  route,
}: {
  icon: LucideIcon;
  name: string;
  selected?: string;
  route?: string;
}) => {
  const pathname = usePathname();
  return (
    <a
      href={route}
      className={`flex p-3 w-full gap-3 
       ${
         pathname && pathname === route
           ? "bg-primary text-white"
           : "bg-transparent"
       } rounded-lg cursor-pointer`}
    >
      <Icon />
      <p className="font-medium">{name}</p>
    </a>
  );
};
