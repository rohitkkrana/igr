// components/SearchCom.tsx
'use client';
import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import  ValueBox from './ValueBox';  // Import ValueBox component
import RangeBox from './RangeBox';

export default function SearchCom() {
  
  const { 

    city, setCity, 
    pincode, setPincode,
    productType,setProductType,
    micromarket, setMicromarket, 
    projectName,setProjectName,
    buildingName,setBuildingName,
    area,setArea,
    price,setPrice,
    agreementValue,setAgreementValue,
    registrationdate,setRegistrationdate,

  } = useContext(SearchContext);

  return (
    <>
      <div>Filters</div>

      {/* Use ValueBox component */}
      <ValueBox title="City" val={city} setVal={setCity} />
      <ValueBox title="Pincode" val={pincode} setVal={setPincode} />
      <ValueBox title="productType" val={productType} setVal={setProductType} />
      <ValueBox title="micromarket" val={micromarket} setVal={setMicromarket} />
      <ValueBox title="projectName" val={projectName} setVal={setProjectName} />
      <ValueBox title="buildingName" val={buildingName} setVal={setBuildingName} />
      <RangeBox title="Area" sub="sq. ft." min={0} max={1000} val={area} setVal={setArea}></RangeBox>
      <RangeBox title="Price" sub="Rs." min={100000} max={100000000} val={price} setVal={setPrice}></RangeBox>
      <RangeBox title="AgreementValue" sub="Rs." min={100000} max={100000000} val={agreementValue} setVal={setAgreementValue}></RangeBox>
      <RangeBox title="RegistrationDate" sub="" min={1984} max={2025} val={registrationdate} setVal={setRegistrationdate}></RangeBox>
    </>
  );
}
