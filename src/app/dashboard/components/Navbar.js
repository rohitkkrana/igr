import SearchBar from "./Search";

const Navbar = () => {
    return (
      <>
      <nav className="bg-base-100 shadow-md p-4 flex justify-between items-center ml-64">
        <div className="flex gap-4">
          <select className="select select-bordered w-40">
            <option>Select State</option>
          </select>
          <select className="select select-bordered w-40">
            <option>Select Location</option>
          </select>
        </div>
        <button className="btn btn-primary">Search</button>
      </nav>
      <SearchBar></SearchBar>
      </>
    );
  };
  
  export default Navbar;
  