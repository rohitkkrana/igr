'use client';

import { useSession } from "next-auth/react";
import Table from "./Table";

const TableWrapper = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="ml-64 p-4">
        <div className="bg-base-100 p-4 rounded-lg shadow">
          <div className="flex items-center justify-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="ml-64 p-4">
        <div className="bg-base-100 p-4 rounded-lg shadow">
          <div className="text-red-500 text-center">Please sign in to view this content</div>
        </div>
      </div>
    );
  }

  return <Table />;
};

export default TableWrapper; 