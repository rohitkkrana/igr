'use client'
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BasicDetails from "./components/BasicDetails";
import IgrDetails from "./components/IgrDetails";
import MoreDetails from "./components/MoreDetails";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomTable() {
  const [activeTab, setActiveTab] = useState("project");
  const [projectData, setProjectData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get project data from sessionStorage
    const storedProject = sessionStorage.getItem('selectedProject');
    if (!storedProject) {
      // If no project data, redirect back to table
      router.push('/dashboard/table');
      return;
    }
    setProjectData(JSON.parse(storedProject));
  }, [router]);

  if (!projectData) {
    return (
      <div className="bg-base-300 min-h-screen">
        <Sidebar />
        <Header />
        <div className="ml-64 p-4">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-300 min-h-screen">
      <Sidebar />
      <Header />

      <div className="ml-64 pt-8 pr-4 pl-4">
        <h1 className="text-2xl font-bold">{projectData.projectname}</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link href={`/dashboard`}>Dashboard</Link></li>
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

      <div className="ml-64 p-4">
        {activeTab === "project" && <BasicDetails projectData={projectData} />}
        {activeTab === "transactions" && <IgrDetails projectData={projectData} />}
        {activeTab === "more" && <MoreDetails projectData={projectData} />}
      </div>
    </div>
  );
}
