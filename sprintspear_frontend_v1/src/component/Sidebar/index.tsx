"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChartGantt,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  Lock,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  const BASE_URL = process.env.BASE_URL;

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl transition-all duration-300 
  z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            SPRINT SPEAR
          </div>
          {!isSidebarCollapsed && (
            <button
              aria-label="Close Sidebar"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-4 border-y-[1.5px] border-gray-200 px-6 py-4 dark:border-gray-700">
          <Image src="/main.png" alt="Team Logo" width={30} height={30} />
          <div className="flex flex-col">
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              EDROH TEAM
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <Lock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={ChartGantt} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="User" href="/user" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {showProjects &&
          projects?.map((project: any) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              href={`/project/${project.id}`}
              label={project.name}
            />
          ))}

        {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <div className="flex flex-col">
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
              color="text-red-600 dark:text-red-400"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
              color="text-orange-500 dark:text-orange-400"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
              color="text-yellow-500 dark:text-yellow-400"
            />
            <SidebarLink
              icon={AlertOctagon}
              label="Low"
              href="/priority/low"
              color="text-green-500 dark:text-green-400"
            />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
              color="text-gray-500 dark:text-gray-400"
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  color?: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  color = "text-gray-800 dark:text-gray-100",
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-200 dark:bg-gray-800" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-500" />
        )}
        <Icon className={`h-6 w-6 ${color}`} />
        <span className={`font-medium ${color}`}>{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
