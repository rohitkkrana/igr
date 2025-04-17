'use client';

// import { Eye, Edit } from "lucide-react";

import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const IgrDetails = ({ projectData }) => {
  const router = useRouter();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      if (!projectData?.projectreraid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/igr/project/related/${projectData.projectreraid}`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch related projects');
        }

        setRelatedProjects(result.data);
      } catch (err) {
        console.error('Error fetching related projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProjects();
  }, [projectData?.projectreraid]);

  const handleViewProject = (pid) => {
    router.push(`/dashboard/view?pid=${pid}`);
  };

  if (!projectData) return null;

  return (
    <div className="p-4">
      <div className="bg-base-100 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Transaction Details</h2>
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-primary">RERA ID: {projectData.projectreraid}</span>
          </div>
        </div>

        {!projectData.projectreraid ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No transactions have been found for this project.</p>
            <p className="text-sm text-gray-500 mt-2">This project does not have a RERA ID associated with it.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Showing all transactions with RERA ID: {projectData.projectreraid}
            </p>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : relatedProjects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No related transactions found with this RERA ID.</p>
              </div>
            ) : (
              <div className="overflow-x-auto mt-4">
                <table className="table w-full border-separate border-gray-600">
                  <thead>
                    <tr className="bg-base-200">
                      <th>RERA ID</th>
                      <th>Document No</th>
                      <th>Document Name</th>
                      <th>Registration Date</th>
                      <th>Building Name</th>
                      <th>Seller Details</th>
                      <th>Buyer Details</th>
                      <th>Property Details</th>
                      <th>Financial Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedProjects.map((project) => (
                      <tr key={project.pid} className="text-sm">
                        <td className="font-medium">{projectData.projectreraid}</td>
                        <td>{project.documentno}</td>
                        <td>{project.documentname}</td>
                        <td>{new Date(project.registrationdate).toLocaleDateString()}</td>
                        <td>
                          <div className="max-w-xs">
                            <p className="truncate">{project.buildingname}</p>
                            <p className="text-xs text-gray-500">Type: {project.buildingtype}</p>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <p className="font-medium">{project.sellername || 'N/A'}</p>
                            <p>Type: {project.sellertype || 'N/A'}</p>
                            <p className="truncate">{project.selleraddress || 'N/A'}</p>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <p className="font-medium">{project.buyername || 'N/A'}</p>
                            <p>Type: {project.buyertype || 'N/A'}</p>
                            <p className="truncate">{project.buyeraddress || 'N/A'}</p>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <p className="truncate">{project.propertydescription}</p>
                            <p>Floor: {project.floorno || 'N/A'}</p>
                            <p>Unit: {project.unitno || 'N/A'}</p>
                            <p>Shop: {project.shopno || 'N/A'}</p>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <p>Market Price: ₹{project.marketprice || 'N/A'}</p>
                            <p>Registration: ₹{project.registrationfees || 'N/A'}</p>
                            <p>Stamp Duty: ₹{project.bharlele_mudrank_shulkhor_stamp_duty_paid || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="flex gap-2">
                          <button 
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleViewProject(project.pid)}
                          >
                            <Icon icon="solar:eye-linear" style={{ fontSize: '18px', color:'#64748B' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IgrDetails;
