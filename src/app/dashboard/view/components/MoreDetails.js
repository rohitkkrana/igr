import { Icon } from "@iconify/react";

const MoreDetails = ({ projectData }) => {
  if (!projectData) return null;

  return (
    <>
    <div className="p-4">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Village Name */}
        <div>
          <label className="block text-sm font-semibold">Village Name</label>
          <p className="text-gray-700 text-xs">{projectData.villagename || 'N/A'}</p>
        </div>
        {/* Taluka */}
        <div>
          <label className="block text-sm font-semibold">Taluka</label>
          <p className="text-gray-700 text-xs">{projectData.taluka || 'N/A'}</p>
        </div>
        {/* District */}
        <div>
          <label className="block text-sm font-semibold">District</label>
          <p className="text-gray-700 text-xs">{projectData.district || 'N/A'}</p>
        </div>
        {/* Survey Number */}
        <div>
          <label className="block text-sm font-semibold">Survey Number</label>
          <p className="text-gray-700 text-xs">{projectData.surveyno || 'N/A'}</p>
        </div>
        {/* Plot Number */}
        <div>
          <label className="block text-sm font-semibold">Plot Number</label>
          <p className="text-gray-700 text-xs">{projectData.plotno || 'N/A'}</p>
        </div>
        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold">Property Type</label>
          <p className="text-gray-700 text-xs">{projectData.propertytype || 'N/A'}</p>
        </div>
      </div>
    </div>
    </div>

    {/* Property Details */}
    <div className=" p-4 pt-2">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
    <h2 className="text-lg font-semibold mb-4">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold">Property Description</label>
            <p className="text-gray-700 text-xs">{projectData.propertydescription || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Property Status</label>
            <p className="text-gray-700 text-xs">{projectData.propertystatus || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold">Property Area</label>
            <p className="text-gray-700 text-xs">{projectData.propertyarea || 'N/A'} sq ft</p>
          </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default MoreDetails;