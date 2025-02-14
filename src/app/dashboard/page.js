'use client'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SearchBar from "./components/Search";
import ProjectCard from "./components/ProjectCard";
import PropertiesCard from "./components/PropertiesCard";
import TransactionsCard from "./components/TransactionsCard";
import MCACard from "./components/MCACard";


export default function Home() {
  return (
    <div className="bg-base-300 min-h-screen">
      <Sidebar />
      <Header />
      <SearchBar></SearchBar>
      <div className="ml-64 p-4 flex gap-8">
        <ProjectCard></ProjectCard>
        <PropertiesCard></PropertiesCard>
        <TransactionsCard></TransactionsCard>
      </div>

      <div className="ml-64 pl-4 pr-4 flex gap-8">
        <MCACard></MCACard>
        
      </div>

    </div>
  );
}
