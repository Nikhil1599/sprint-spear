"use client";
import React, { useState } from "react";
import ProjectHeader from "@/app/project/[id]/ProjectHeader";
import BoardView from "../BoardView";
import ListView from "../ListView";
import Timeline from "../TimelineView";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Timeline");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModelNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModelNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
