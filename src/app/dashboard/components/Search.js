import { Icon } from "@iconify/react";

const  SearchBar = ()=> {
  return (
    <div className=" ml-64 pt-4 pr-4 pl-4 ">
      <div className="flex items-center justify-items-center justify-center p-4 gap-4  bg-base-100 shadow-md rounded-lg " >
      {/* Dropdowns */}
      {["Select State", "Select Location", "Select Location"].map((label, index) => (
        <div key={index} className="flex text-gray-400  gap-5 items-center  ">
          <Icon icon="lucide:map-pin" style={{fontSize:"18px"}}/>
          <select className="bg-transparent outline-none text-gray-500 select-sm">
            <option>{label}</option>
          </select>
          <div className="divider lg:divider-horizontal"></div>
        </div>
      ))}

      {/* Filter Icon */}
      <button className="text-gray-400">
        <Icon icon="circum:filter" style={{fontSize:"18px"}} />
      </button>

      {/* Search Button */}
      <button className="bg-blue-600 text-white px-6  rounded-xl font-semibold btn-sm">
        Search
      </button>
      </div>
    </div>
  );
}

export default SearchBar;