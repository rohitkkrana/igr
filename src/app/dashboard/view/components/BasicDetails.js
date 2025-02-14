// import { Eye, Edit } from "lucide-react";

import { Icon } from "@iconify/react";

const BasicDetails = () => {


  return (
    <>
    <div className="ml-64 p-4">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Project Id */}
        <div>
          <label className="block text-sm font-semibold">Project Id</label>
          <p className="text-gray-700 text-xs">P52100005207</p>
        </div>
        {/* Project Name */}
        <div>
          <label className="block text-sm font-semibold">Project Name</label>
          <p className="text-gray-700 text-xs">URBAN FOREST A WING</p>
        </div>
        {/* State */}
        <div>
          <label className="block text-sm font-semibold">State</label>
          <p className="text-gray-700 text-xs">Maharashtra</p>
        </div>
        {/* City */}
        <div>
          <label className="block text-sm font-semibold">City</label>
          <p className="text-gray-700 text-xs">Pune</p>
        </div>
        {/* Locality */}
        <div>
          <label className="block text-sm font-semibold">Locality</label>
          <p className="text-gray-700 text-xs">23 Desember 2003</p>
        </div>
        {/* Date of Completion */}
        <div>
          <label className="block text-sm font-semibold">Date of Completion</label>
          <p className="text-gray-700 text-xs">23 Desember 2003</p>
        </div>
        {/* Status */}
        <div>
          <label className="block text-sm font-semibold">Status</label>
          <p className="text-gray-700 text-xs">Under Construction</p>
        </div>
        {/* Total Building */}
        <div>
          <label className="block text-sm font-semibold">Total Building</label>
          <p className="text-gray-700 text-xs">23 Desember 2003</p>
        </div>
        {/* Address */}
        <div className="md:col-span-3">
          <label className="block text-sm font-semibold">Address</label>
          <p className="text-gray-700 text-xs">GAT NO 267 E KUSGAON KHURD MAWAL PUNE 410401</p>
        </div>
      </div>
    </div>
    </div>

    {/* Building Information */}
    <div className="ml-64 p-4 pt-2">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
    <h2 className="text-lg font-semibold mb-4">Building Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold">Total Floor</label><p className="text-gray-700 text-xs">Male</p></div>
          <div><label className="block text-sm font-semibold">Area</label><p className="text-gray-700 text-xs">2715.58 sq ft</p></div>
          <div><label className="block text-sm font-semibold">Address</label><p className="text-gray-700 text-xs">23 Desember 2003</p></div>
          <div><label className="block text-sm font-semibold">Pan Number</label><p className="text-gray-700 text-xs">Male</p></div>
          <div><label className="block text-sm font-semibold">Active From</label><p className="text-gray-700 text-xs">23 Desember 2003</p></div>
        </div>
    </div>
    </div>

    {/* Builder Information */}
    <div className="ml-64 p-4 pt-2">
      <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Builder Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold">Name</label><p className="text-gray-700 text-xs">EKDANTA NEST LLP</p></div>
          <div><label className="block text-sm font-semibold">Company</label><p className="text-gray-700 text-xs">URBAN FOREST A WING</p></div>
          <div><label className="block text-sm font-semibold">Address</label><p className="text-gray-700 text-xs">GANESH HEIGHTS A WING Haveli Pune 411019 MAHARASHTRA</p></div>
          <div><label className="block text-sm font-semibold">Mobile Number</label><p className="text-gray-700 text-xs">9168365556</p></div>
          <div><label className="block text-sm font-semibold">Email</label><p className="text-gray-700 text-xs">akashpatil5556@gmail.com</p></div>
        </div>
      </div>
    </div>

    </>
  );
};

export default BasicDetails;
