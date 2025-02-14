'use client'
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BasicDetails from "./components/BasicDetails";
import IgrDetails from "./components/IgrDetails";
import MoreDetails from "./components/MoreDetails";
import Link from "next/link";
export default function CustomTable() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="bg-base-300 min-h-screen">
      <Sidebar />
      <Header />

      <div className="ml-64 pt-8 pr-4 pl-4">
        <h1 className="text-2xl font-bold">Projects Name</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link href={`/deashboard`}>Dashboard</Link></li>
            <li><Link href={`/dashboard/table`}>Project</Link></li>
            <li className="text-primary">View</li>
          </ul>
        </div>
      </div>
      
      <div className="ml-64 pt-4 pr-4 pl-4">
        <div className="flex items-center justify-center p-4 gap-4 bg-base-100 shadow-md rounded-lg">
          <button 
            className={`btn w-1/4 ${activeTab === "project" ? "btn-primary" : ""}`} 
            onClick={() => setActiveTab("project")}
          >
            Project Information
          </button>
          <button 
            className={`btn w-1/4 ${activeTab === "transactions" ? "btn-primary" : ""}`} 
            onClick={() => setActiveTab("transactions")}
          >
            Transactions Information
          </button>
          <button 
            className={`btn w-1/4 ${activeTab === "more" ? "btn-primary" : ""}`} 
            onClick={() => setActiveTab("more")}
          >
            More Information
          </button>
        </div>
      </div>

     
        {activeTab === "project" && <BasicDetails />}
        {activeTab === "transactions" && <IgrDetails />}
        {activeTab === "more" && <MoreDetails />}
    
    </div>
  );
}
