import React from "react";
import Bento from "@/components/Bento";
import Sidebar from "@/components/Sidebar";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-row w-full md:h-screen">
      <Sidebar />
      <div className="flex-1 z-40 overflow-auto">
        <Bento />
      </div>
    </div>
  );
};

export default Home;
