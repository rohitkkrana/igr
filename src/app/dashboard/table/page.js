'use client'
import Sidebar from "../components/Sidebar";

import Table from "./components/Table";
import Header from "../components/Header";
import SearchBar from "../components/Search";
import Link from "next/link";

export default function CustomTable() {
  return (
    <div className="bg-base-300 min-h-screen">
      <Sidebar />
      <Header />

      <div className=" ml-64 pt-8 pr-4 pl-4 ">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li><Link href={`/dashboard`}>Dashboard</Link></li>
            <li><Link href={`/dashboard/table`}>Project</Link></li>
            <li className="text-primary">Table</li>
          </ul>
        </div>
      </div>
      <Table></Table>




    </div>
  );
}
