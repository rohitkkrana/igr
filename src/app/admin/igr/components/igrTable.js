'use client';
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import SearchContext from '../context/SearchContext';

export default function SearchSortTable({ apiUrl }) {
  const { city, pincode, projectName } = useContext(SearchContext);
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState({});
  const [sortConfig, setSortConfig] = useState(null);
  const tableRef = useRef(null);

  const fetchData = async (page, city, pincode, projectName) => {
    const url = `${apiUrl}?city=${city}&pincode=${pincode}&projectName=${projectName}&page=${page}`;
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  };

  const loadData = async (initial = false) => {
    if (loading) return;
    setLoading(true);
    try {
      if (initial) {
        setPage(1);
        setOriginalData([]);
        setData([]);
        setHasMore(true);
      }
      const result = await fetchData(page, city, pincode, projectName);
      if (result.length > 0) {
        setOriginalData(prev => (initial ? result : [...prev, ...result]));
        setData(prev => (initial ? result : [...prev, ...result]));
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query, columnKey) => {
    setSearchQuery(prev => ({ ...prev, [columnKey]: query }));
    const filteredData = originalData.filter(row =>
      row[columnKey]?.toString().toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };

  const sortData = (key) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] == null) return 1;
      if (b[key] == null) return -1;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleScroll = useCallback(() => {
    const SCROLL_THRESHOLD = 10;
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollHeight - scrollTop - clientHeight < SCROLL_THRESHOLD) {
        loadData();
      }
    }
  }, []);

  useEffect(() => {
    loadData(true);
  }, [city, pincode, projectName]);

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div>
      <div className="overflow-auto max-h-[86vh]" ref={tableRef}>
        <table className="table table-zebra w-full table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {originalData.length > 0 &&
                Object.keys(originalData[0]).map(key => (
                  <th key={key}>
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={searchQuery[key] || ''}
                        onChange={e => handleSearch(e.target.value, key)}
                        placeholder={`Search ${key}`}
                        className="mb-2 text-sm border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <button className="text-xs" onClick={() => sortData(key)}>
                        <span className='tracking-wider'>{key}</span>{' '}
                        {sortConfig?.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                      </button>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map(key => (
                  <td key={key}>{row[key] || 'N/A'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div className="text-center p-4">Loading...</div>}
      {!hasMore && <div className="text-center p-4">No more data to load</div>}
    </div>
  );
}
