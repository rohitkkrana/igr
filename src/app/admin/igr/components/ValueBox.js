import React, { useState, useEffect,useRef, useCallback  } from 'react';



const ValueBox = ({ title, val, setVal }) => {
  const [inputValue, setInputValue] = useState(val);
  const [data,setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [modal,setModal] = useState(false);
  const [loading,setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setInputValue(val); // Sync inputValue with val prop
  }, [val]);
  
  useEffect(() => {
    if (modal && modalRef.current) {
      modalRef.current.showModal(); // Open the modal
    } else if (modalRef.current) {
      modalRef.current.close(); // Close the modal
    }
  }, [modal]);

  const handleSelection = (selectedValue) => {
    setInputValue((prevValues) =>
      prevValues.includes(selectedValue)
        ? prevValues.filter((value) => value !== selectedValue) // Unselect
        : [...prevValues, selectedValue] // Select
    );
  };

    const getdata = useCallback( async()=>{
      
      try{
        setLoading(true);
        const data = await fetch("/api/callapi",{
          method:"POST",
          body: JSON.stringify({method:"GET",uri:`/api/autocomplete/?field=${title.id}`,data:{}})
        });
        if(data.status !== 200)
          return false;
        const d = await data.json(); 
          setData(d);        
      }catch(e){
        console.error("server error",e)
      }finally {
        setLoading(false);
      }
    },[])

    useEffect(()=>{
      if(modal ){
        getdata();
      }
    },[modal,getdata])

  const handleSave = () => {
    setVal(inputValue);
    setModal(false);
  };

  const handleRemove = (valueToRemove) => {
    const updatedValues = val.filter((v) => v !== valueToRemove);
    setVal(updatedValues);
  };

  const filteredCities = data.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="collapse collapse-arrow shadow-lg rounded border border-gray-300/[.33] bg-gray-400/[.22]">
      <input type="checkbox" id={title.id} className="peer" />
      <div className="collapse-title text-base font-semibold">{title.name}</div>
      <div className="collapse-content peer-checked:block hidden">
        <div className="flex gap-2 flex-wrap">
          {val.length > 0 ? (
            val.map((v, index) => (
              <div
                key={index}
                className="chip bg-blue-500/[.44] text-white text-xs tracking-wider px-2 py-1 rounded-full flex items-center space-x-2"
              >
                <span>{v}</span>
                <button
                  className="text-white"
                  onClick={() => handleRemove(v)}
                  aria-label={`Remove ${v}`}
                >
                  &times;
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No selection</span>
          )}
        </div>
        <div className="pt-2 pb-2">
          <hr />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-xs btn-info"
            onClick={() => {
              setInputValue(val);
              setModal(true);
            }}
          >
            Select {title.name}
          </button>
        </div>
      </div>

      {/* Modal */}
     
      <dialog className="modal" ref={modalRef} onClose={() => setModal(false)} >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select your {title.name}</h3>
          <p className="py-4">Press ESC key or click outside to close</p>

          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-col gap-2 h-[40vh] overflow-auto">
            { (loading)?<div className='flex items-center justify-items-center h-[40vh]'>loading...</div>:filteredCities.map((city, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inputValue.includes(city)}
                  onChange={() => handleSelection(city)}
                  className="checkbox"
                />
                <span>{city}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button className="btn btn-ghost" onClick={() =>setModal(false)}>
              Cancel
            </button>
            <button className="btn btn-success text-white ml-2" onClick={handleSave}>
              Save {title.name}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ValueBox;
