import React, { useState, useEffect } from 'react';

const dummyData = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
];

const ValueBox = ({ title, val, setVal }) => {
  const [inputValue, setInputValue] = useState(val);
  const [searchQuery, setSearchQuery] = useState('');
  const modalId = `${title}-modal`;

  useEffect(() => {
    setInputValue(val); // Sync inputValue with val prop
  }, [val]);

  const handleSelection = (selectedValue) => {
    setInputValue((prevValues) =>
      prevValues.includes(selectedValue)
        ? prevValues.filter((value) => value !== selectedValue) // Unselect
        : [...prevValues, selectedValue] // Select
    );
  };

  const handleSave = () => {
    setVal(inputValue);
    document.getElementById(modalId)?.close();
  };

  const handleRemove = (valueToRemove) => {
    const updatedValues = val.filter((v) => v !== valueToRemove);
    setVal(updatedValues);
  };

  const filteredCities = dummyData.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="collapse collapse-arrow shadow-lg rounded border border-gray-300/[.33] bg-gray-400/[.22]">
      <input type="checkbox" id={title} className="peer" />
      <div className="collapse-title text-base font-semibold">{title}</div>
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
              document.getElementById(modalId)?.showModal();
            }}
          >
            Select {title}
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select your {title}</h3>
          <p className="py-4">Press ESC key or click outside to close</p>

          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-col gap-2 h-[40vh] overflow-auto">
            {filteredCities.map((city, index) => (
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
            <button className="btn btn-ghost" onClick={() => document.getElementById(modalId)?.close()}>
              Cancel
            </button>
            <button className="btn btn-success text-white ml-2" onClick={handleSave}>
              Save {title}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ValueBox;
