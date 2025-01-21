'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function SearchSortTable({ fetchData, defaultColumnConfig }) {
  const [data, setData] = useState([]); // Data to display
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const [columnOffsets, setColumnOffsets] = useState({});
  const [searchQuery, setSearchQuery] = useState({}); // Search queries
  const [sortConfig, setSortConfig] = useState(null); // Sort configuration

  const tableRef = useRef(null); // Table reference for scroll detection

  // Fetch data with pagination
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await fetchData(page);
      if (result.length > 0) {
        const sortedResult = result.map((row) => {
          const orderedRow = {};
          Object.keys(defaultColumnConfig)
            .sort((a, b) => defaultColumnConfig[a].order - defaultColumnConfig[b].order)
            .forEach((key) => {
              orderedRow[key] = row[key];
            });

          Object.keys(row).forEach((key) => {
            if (!(key in orderedRow)) {
              orderedRow[key] = row[key];
            }
          });

          return orderedRow;
        });
        setData((prevData) => [...prevData, ...sortedResult]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, fetchData, page, defaultColumnConfig]);

  useEffect(() => {
    loadMoreData(); // Load initial data
  }, []);

  useEffect(() => {
    const calculateOffsets = () => {
      const offsets = {};
      let cumulativeOffset = 0;
      Object.keys(defaultColumnConfig)
        .sort((a, b) => defaultColumnConfig[a].order - defaultColumnConfig[b].order)
        .forEach((key) => {
          const columnHeader = document.querySelector(`th[data-key="${key}"]`);
          offsets[key] = cumulativeOffset;
          cumulativeOffset += columnHeader?.offsetWidth || 0;
        });
      setColumnOffsets(offsets);
    };
    calculateOffsets();
    window.addEventListener("resize", calculateOffsets);
    return () => {
      window.removeEventListener("resize", calculateOffsets);
    };
  }, [defaultColumnConfig, data]);

  const sortData = (key) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] === null || a[key] === undefined) return 1;
      if (b[key] === null || b[key] === undefined) return -1;
      return direction === 'asc' ? (a[key] < b[key] ? -1 : 1) : (a[key] > b[key] ? -1 : 1);
    });
    setData(sortedData);
  };

  const handleSearch = (query, columnKey) => {
    setSearchQuery((prevSearch) => ({ ...prevSearch, [columnKey]: query }));
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = data.filter((row) => row[columnKey]?.toString().toLowerCase().includes(lowerCaseQuery));
    setData(filteredData);
  };

  return (
    <div>
      <div className="overflow-auto max-h-[86vh]" ref={tableRef}>
        <table className="table table-zebra w-full">
          <thead className="sticky top-0 z-10">
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => {
                  const columnConfig = defaultColumnConfig[key] || {};
                  return (
                    <th
                      key={key}
                      data-key={key}
                      className={`${columnConfig.fixed ? 'sticky bg-success z-1000' : ''}`}
                      style={{ left: columnConfig.fixed ? `${columnOffsets[key] || 0}px` : 'auto' }}
                    >
                      <div className="flex flex-col items-center">
                        <input
                          type="text"
                          value={searchQuery[key] || ''}
                          onChange={(e) => handleSearch(e.target.value, key)}
                          placeholder={`Search ${key}`}
                          className="mb-2 text-sm border border-gray-300 rounded px-2 py-1 w-full"
                        />
                        <button className="text-xs text-gray-500" onClick={() => sortData(key)}>
                          <span>{key}</span> {sortConfig?.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                        </button>
                      </div>
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="relative">
                {Object.keys(row).map((key) => {
                  const columnConfig = defaultColumnConfig[key] || {};
                  return (
                    <td
                      key={key}
                      className={`${columnConfig.fixed ? 'sticky bg-success text-gray-900 z-0' : ''}`}
                      style={{ left: columnConfig.fixed ? `${columnOffsets[key] || 0}px` : 'auto' }}
                    >
                      {row[key] || 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      {loading && <div className="text-center p-4">Loading...</div>}
      {!hasMore && <div className="text-center p-4">No more data to load</div>}
    </div>
  );
}
