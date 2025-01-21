'use client';
import React from 'react';
import Header from './modules/Header';
import SearchSortTable from './component/SearchSortTable';

export default function Dashboard() {
  // Fetch data function
  const fetchData = async (page) => {
    const response = await fetch(`/api/igr?page=${page}`);
    const result = await response.json();
    return result.results;
  };

  const defaultColumnConfig = {
    id: { order: 1, fixed: true },
    city: { order: 2, fixed: true },
    propertydescription: { order: 3, fixed: true },
    // add more columns here
  };

  return (
    <div>
      <Header />
      <div className='p-4'>
        <SearchSortTable fetchData={fetchData} defaultColumnConfig={defaultColumnConfig} />
      </div>
    </div>
  );
}
