// import { Eye, Edit } from "lucide-react";

import { Icon } from "@iconify/react";

const BasicDetails = ({ projectData }) => {
  if (!projectData) return null;

  return (
    <>
    <div className="p-4">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Project Id */}
        <div>
          <label className="block text-sm font-semibold">Project Id</label>
          <p className="text-gray-700 text-xs">{projectData.id}</p>
        </div>
        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold">Project Name</label>
          <p className="text-gray-700 text-xs">{projectData.projectname}</p>
        </div>
        {/* State */}
        <div>
          <label className="block text-sm font-semibold">State</label>
          <p className="text-gray-700 text-xs">{projectData.state}</p>
        </div>
        {/* City */}
        <div>
          <label className="block text-sm font-semibold">City</label>
          <p className="text-gray-700 text-xs">{projectData.city}</p>
        </div>
        {/* Micromarket */}
        <div>
          <label className="block text-sm font-semibold">Micromarket</label>
          <p className="text-gray-700 text-xs">{projectData.micromarket}</p>
        </div>
        {/* Registration Date */}
        <div>
          <label className="block text-sm font-semibold">Registration Date</label>
          <p className="text-gray-700 text-xs">{new Date(projectData.registrationdate).toLocaleDateString()}</p>
        </div>
        {/* Status */}
        <div>
          <label className="block text-sm font-semibold">Status</label>
          <p className="text-gray-700 text-xs">{projectData.status || 'N/A'}</p>
        </div>
        {/* Total Units */}
        <div>
          <label className="block text-sm font-semibold">Total Units</label>
          <p className="text-gray-700 text-xs">{projectData.totalunits || 'N/A'}</p>
        </div>
        {/* Address */}
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold">Address</label>
          <p className="text-gray-700 text-xs">{projectData.projectaddress}</p>
        </div>
      </div>
    </div>
    </div>

    {/* Building Information */}
    <div className=" p-4 pt-2">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
    <h2 className="text-lg font-semibold mb-4">Building Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold">Floor No</label>
            <p className="text-gray-700 text-xs">{projectData.floorno || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Area</label>
            <p className="text-gray-700 text-xs">{projectData.carpetarea} sq ft</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Unit No</label>
            <p className="text-gray-700 text-xs">{projectData.unitno || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Shop No</label>
            <p className="text-gray-700 text-xs">{projectData.shopno || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Building Type</label>
            <p className="text-gray-700 text-xs">{projectData.buildingtype || 'N/A'}</p>
          </div>
        </div>
    </div>
    </div>

    {/* Builder Information */}
    <div className=" p-4 pt-2">
      <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Builder Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <p className="text-gray-700 text-xs">{projectData.developername}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">RERA ID</label>
            <p className="text-gray-700 text-xs">{projectData.projectreraid || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Address</label>
            <p className="text-gray-700 text-xs">{projectData.developeraddress || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Mobile Number</label>
            <p className="text-gray-700 text-xs">{projectData.developermobile || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <p className="text-gray-700 text-xs">{projectData.developeremail || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BasicDetails;
