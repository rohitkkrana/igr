'use client';

// import { Eye, Edit } from "lucide-react";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

const Table = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the API URL to prevent unnecessary re-renders
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (searchQuery && searchQuery.length >= 3) {
      params.append('search', searchQuery);
    }
    return `/api/igr/project-home?${params.toString()}`;
  }, [page, limit, searchQuery]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result.results);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Fetch data when component mounts or when page/limit/search changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(parseInt(newLimit));
    setPage(1); // Reset to first page when changing limit
  }, []);

  const handleSearch = useCallback(() => {
    if (search.length >= 3) {
      setSearchQuery(search);
      setPage(1); // Reset to first page when searching
    }
  }, [search]);

  const handleInputChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleViewProject = useCallback(async (project) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/igr/project/${project.pid}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch project details');
      }

      // Store the detailed project data in sessionStorage
      sessionStorage.setItem('selectedProject', JSON.stringify(result.data));
      // Navigate to the view page
      router.push('/dashboard/view');
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="ml-64 p-4">
      <div className="bg-base-100 p-4 rounded-lg shadow">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
                <Icon 
                  icon="lucide:search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                />
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleSearch}
                disabled={search.length < 3 || loading}
              >
                Search
              </button>
            </div>
            {search && search.length < 3 && (
              <p className="text-sm text-gray-500 mt-1">Enter at least 3 characters to search</p>
            )}
          </div>
          <select 
            className="select select-bordered"
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
            disabled={loading}
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Buyer Name</th>
                  <th>City</th>
                  <th>Micromarket</th>
                  <th>State</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.projectname}</td>
                    <td>{item.buyername}</td>
                    <td>{item.city}</td>
                    <td>{item.micromarket}</td>
                    <td>{item.state}</td>
                    <td>{new Date(item.registrationdate).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleViewProject(item)}
                        >
                          <Icon icon="lucide:eye" className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm">
                          <Icon icon="lucide:edit" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {data.length} of {totalPages * limit} entries
          </div>
          <div className="join">
            <button
              className="join-item btn btn-sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
            >
              «
            </button>
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                className={`join-item btn btn-sm ${pageNum === page ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </button>
            ))}
            <button
              className="join-item btn btn-sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || loading}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
