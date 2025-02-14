// import { Eye, Edit } from "lucide-react";

import { Icon } from "@iconify/react";

const IgrDetails = () => {
  const data = [
    { id: "ID 491326", name: "Bellavista Building", status: "Ready", date: "29-04-2019", state: "Maharashtra", city: "Pune", locality: "Pune Cantonment Area" },
    { id: "ID 491327", name: "S.S. Hight", status: "Not Ready", date: "29-04-2019", state: "Maharashtra", city: "Pune", locality: "Gopadhi" },
  ];

  return (
    <div className="ml-64 p-4">
      <div className="bg-base-100 p-4 rounded-lg shadow">
    
        <div className="overflow-x-auto mt-4">
          <table className="table w-full border-separate  border-gray-600">
            <thead>
              <tr className="bg-base-200">
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Status</th>
                <th>Project DOC</th>
                <th>State</th>
                <th>City</th>
                <th>Locality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="text-sm">
                  <td className="text-primary cursor-pointer">{row.id}</td>
                  <td>{row.name}</td>
                  <td>
                    <span className={`badge text-sm ${row.status === "Ready" ? "badge-success" : "badge-error"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.date}</td>
                  <td>{row.state}</td>
                  <td>{row.city}</td>
                  <td>{row.locality}</td>
                  <td className="flex gap-2">
                    <Icon icon="solar:eye-linear" style={{ fontSize: '18px', color:'#64748B' }} />
                    <button className="btn btn-ghost btn-sm">
                      {/* <Edit size={18} /> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between  items-center">
        <div className="text-left mt-4 text-sm">1-2 of 13 Pages</div>
        <div className="text-right mt-4 text-sm">
            <div className="flex gap-2 justify-center">
              <span>The page on</span>
              <select className=" outline-none text-gray-500 select-xs">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>

              </select>
              <button className="btn btn-sm">  <Icon icon="iconamoon:arrow-left-2-light" style={{ color:'#64748B' }} /></button>
              <button className="btn btn-sm">  <Icon icon="iconamoon:arrow-right-2-light" style={{ color:'#64748B' }} /></button>
            </div>
          
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default IgrDetails;
