/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserAuth } from "@/utils/hooks/useUserAuth";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
export default function Home() {
  const RenderSpecial = () => {
    return <h2 className="font-bold">NutriSnap</h2>;
  };
  const teamRef: React.RefObject<HTMLDivElement> = useRef(null);

  const scrollToTeam = () => {
    if (teamRef.current) {
      teamRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { userData, loading } = useUserAuth();
  console.log(userData);
  return (
    <div className="flex flex-col items-start container gap-3">
      <Navbar special={RenderSpecial} />
      <CustomBadge>Introducing NutriSnap</CustomBadge>
      <Hero scrollToTeam={scrollToTeam} />
      <div ref={teamRef}>
        <CustomBadge className="mt-10">The Team</CustomBadge>
      </div>
      <TheTeam />
    </div>
  );
}

interface CustomBadgeProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
const CustomBadge = ({ children, className, ...rest }: CustomBadgeProps) => {
  return (
    <div
      {...rest}
      className={`rounded-full px-4 py-1 w-fit text-sm border-2 border-foreground ${className}`}
    >
      {children}
    </div>
  );
};

const Hero = ({ scrollToTeam }: { scrollToTeam: () => void }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="font-bold text-3xl text-center">
        The Ultimate Food Picture to Nutrition Solution
      </h1>
      <p className="text-base text-foreground/60 text-center">
        Transform your dining experience with NutriSnap! Snap a pic of your meal
        and unlock its nutrition facts instantly. Harnessing AI, we provide
        real-time nutritional analysis, empowering you to make informed choices
        effortlessly.
      </p>
      <div className="mt-5 flex flex-col gap-2 w-full">
        <a href="/login" className="w-full">
          <Button className="w-full">Start Now</Button>
        </a>
        <Button variant={"secondary"} onClick={scrollToTeam}>
          View the Team
        </Button>
      </div>
    </div>
  );
};

const TheTeam = () => {
  const initialMembers = [
    {
      name: "Alejandro Vera",
      role: "Software Engineer",
      image:
        "https://media.licdn.com/dms/image/D4E35AQHGlbhv55wH9A/profile-framedphoto-shrink_400_400/0/1686157578275?e=1711846800&v=beta&t=tt1gXZpla3cy3JuOv422t4Q9_oTW9RtVXSeNxOG9f9I",
      linkedin: "https://www.linkedin.com/in/alejandrovera09/",
      github: "https://github.com/AlejandroV01",
    },
    {
      name: "Dabian Garnica",
      role: "Software Engineer",
      image:
        "https://media.licdn.com/dms/image/D4E03AQH_kvHSfhRGNg/profile-displayphoto-shrink_400_400/0/1708469883582?e=1717027200&v=beta&t=lRs0izmB0SzUy2v1TmxnIM3UC5RG2LioHTsvLOnatPY",
      linkedin: "https://www.linkedin.com/in/dabian/",
      github: "https://github.com/dab1an",
    },
    {
      name: "Jacob Schuster",
      role: "Software Engineer",
      image:
        "https://media.licdn.com/dms/image/D4E03AQEKqeXdble3Dg/profile-displayphoto-shrink_800_800/0/1686098670822?e=1717027200&v=beta&t=8bN-UziDLdwDGzKUX76Iz84yrjtlHnFTtZ1LsYdOVTY",
      linkedin: "https://www.linkedin.com/in/jacob-schuster-396947211/",
      github: "https://github.com/Jacob8765",
    },
  ];

  const [members, setMembers] = useState(initialMembers);

  useEffect(() => {
    shuffleMembers();
  }, []);

  const shuffleMembers = () => {
    const shuffledMembers = [...initialMembers];
    for (let i = shuffledMembers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMembers[i], shuffledMembers[j]] = [
        shuffledMembers[j],
        shuffledMembers[i],
      ];
    }
    setMembers(shuffledMembers);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <p className="text-foreground/60 text-center ">
        Get acquainted with the brilliant minds driving our vision forward in
        this section.
      </p>
      {members.map((member) => {
        return <MemberCard key={member.name} member={member} />;
      })}
    </div>
  );
};

interface IMemberCard {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
}
const MemberCard = ({ member }: { member: IMemberCard }) => {
  return (
    <Card className="flex gap-3 w-full p-3 shadow-lg shadow-primary/30">
      <img
        src={member.image}
        alt={member.name}
        className="rounded-full w-[90px] border-4 border-primary"
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">{member.name}</h2>
          <p>{member.role}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={member.linkedin}
            className="bg-[#0077B5] text-white p-1 rounded-lg"
          >
            <Linkedin />
          </a>
          <a
            href={member.github}
            className="bg-black text-white p-1 rounded-lg"
          >
            <Github />
          </a>
        </div>
      </div>
    </Card>
  );
};
