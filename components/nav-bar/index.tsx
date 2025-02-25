"use client";
import React from "react";
import { ChevronDown, Loader, Moon, Sun } from "lucide-react";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Image from "next/image";

const NavBar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="shadow-sm w-full sticky top-0  bg-white dark:bg-gray-900 z-[9999]">
      {/* <div className="w-full flex items-center justify-center h-auto bg-black">
        <div className="max-w-6xl mx-auto py-2">
          <p className="text-white text-sm">
            <b>Subcribe to the channel 🙏</b>! Boost your resume with Resume
            Genie Resume Course out{" "}
            <a className="inline-flex items-center gap-1 font-bold text-primary">
              ResumeGenie Course
              <ExternalLink size="14px" />
            </a>
          </p>
        </div>
      </div> */}
      <div className="w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between ">
        <div className="flex items-center flex-1 gap-9">
          <div>
            {/* <h5 className="font-black text-lg text-primary">ResumeGenie</h5> */}
            <>
              <Image
                src={"/images/resumeGenie_Cropped_Black.png"}
                height={30}
                width={130}
                alt="resume genie logo"
                className="block dark:hidden"
              />
              <Image
                src={"/images/resumeGenie_Cropped_White.png"}
                height={30}
                width={130}
                alt="resume genie logo"
                className="dark:block hidden"
              />
            </>
          </div>

          <div className="hidden lg:flex">
            <ul className="flex items-center gap-5 text-[14px] font-medium text-black dark:text-white">
              <li>
                <Link href="#">AI Features</Link>
              </li>
              <li>
                <Link href="#">Resources</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LoginLink>
            <Button variant="outline">Sign In</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
