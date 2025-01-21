import React, { useState, useEffect } from "react";

const RangeBox = ({ title, sub = "", min, max, val, setVal }) => {
  const [minValue, setMinValue] = useState(
    typeof val.min === "number" ? val.min : Number(val.min)
  );
  const [maxValue, setMaxValue] = useState(
    typeof val.max === "number" ? val.max : Number(val.max)
  );

  useEffect(() => {
    if (typeof min !== "number" || typeof max !== "number") {
      console.warn("Min and Max values must be numbers.");
    }
  }, [min, max]);

  const handleMinChange = (e) => {
    const parsedValue = parseInt(e.target.value);
    const numericMaxValue = typeof maxValue === "number" ? maxValue : Number(maxValue);
    const value = Math.min(parsedValue, numericMaxValue - 1);
    setMinValue(value);
    setVal({ min: value, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const parsedValue = parseInt(e.target.value);
    const numericMinValue = typeof minValue === "number" ? minValue : Number(minValue);
    const value = Math.max(parsedValue, numericMinValue + 1);
    setMaxValue(value);
    setVal({ min: minValue, max: value });
  };

  const handleStoreValues = () => {
    setVal({ min: minValue, max: maxValue });
  };

  // Calculate percentage for the background bar
  const getRangePercentage = (value, min, max) => {
    return ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;
  };

  return (
    <div className="collapse collapse-arrow shadow-lg rounded border border-gray-300/[.33]">
      <input type="checkbox" id={title} className="peer" />
      <div className="collapse-title text-base font-semibold">
        {title} {sub}
      </div>
      <div className="collapse-content peer-checked:block hidden">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col ">
            <span className="text-sm">Sel. Range: </span>
            <p className="text-sm">{minValue} - {maxValue} {sub}</p>
          </div>

          <div className="relative w-full">
            <div className="badge badge-sm">Min</div>
            <input
              type="range"
              min={Number(min)}
              max={Number(max)}
              value={minValue}
              onChange={handleMinChange}
              className="range range-xs range-primary"
              style={{ width: "100%" }}
              aria-label="Select minimum value"
            />

            <div className="badge badge-sm">Max</div>
            <input
              type="range"
              min={Number(min)}
              max={Number(max)}
              value={maxValue}
              onChange={handleMaxChange}
              className="range range-xs range-secondary"
              style={{ width: "100%" }}
              aria-label="Select maximum value"
            />

            <div
              className="h-1 bg-warning absolute"
              style={{
                left: `${getRangePercentage(minValue, min, max)}%`,
                right: `${100 - getRangePercentage(maxValue, min, max)}%`,
                top: "100px",
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <input
              type="number"
              value={minValue}
              min={min}
              max={Number(maxValue) - 1}
              onChange={handleMinChange}
              className="input input-xs input-bordered w-24"
              aria-label="Enter minimum value"
            />
            <input
              type="number"
              value={maxValue}
              min={Number(minValue) + 1}
              max={max}
              onChange={handleMaxChange}
              className="input input-xs input-bordered w-24"
              aria-label="Enter maximum value"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="badge badge-sm">Min</div>
            <div className="badge badge-sm">Max</div>
          </div>

          <div className="flex justify-end mt-4">
            <button onClick={handleStoreValues} className="btn btn-primary btn-xs">
              Set Range
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeBox;
