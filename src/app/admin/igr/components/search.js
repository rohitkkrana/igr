// components/SearchCom.tsx
'use client';
import React, { useContext, useEffect } from 'react';
import SearchContext from '../context/SearchContext';
import  ValueBox from './ValueBox';  // Import ValueBox component
import RangeBox from './RangeBox';
import { stringify } from 'postcss';

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

  const getdata = async()=>{
    try{
      const data = await fetch("/api/callapi",{
        method:"POST",
        body: JSON.stringify({method:"GET",uri:`/api/autocomplete/?field=developername&query=kolte`,data:{}})
      });
      const d = await data.json();
      console.log(d)
    }catch(e){
      console.error("server error",e)
    }
  }
  
  useEffect(()=>{
    getdata();
  },[])

  return (
    <>
      <div>Filters</div>

      {/* Use ValueBox component */}
      <ValueBox title={{id:"city",name:"City"}} val={city} setVal={setCity} />
      <ValueBox title={{id:"Pincode",name:"Pincode"}} val={pincode} setVal={setPincode} />
      <ValueBox title={{id:"productType",name:"Product Type"}} val={productType} setVal={setProductType} />
      <ValueBox title={{id:"micromarket",name:"Micro Market"}} val={micromarket} setVal={setMicromarket} />
      <ValueBox title={{id:"projectName",name:"Project Name"}} val={projectName} setVal={setProjectName} />
      <ValueBox title={{id:"buildingName",name:"Building Name"}} val={buildingName} setVal={setBuildingName} />
      <RangeBox title={{id:"Area",name:"Area"}} sub="sq. ft." min={0} max={1000} val={area} setVal={setArea}></RangeBox>
      <RangeBox title={{id:"Price",name:"Price"}} sub="Rs." min={100000} max={100000000} val={price} setVal={setPrice}></RangeBox>
      <RangeBox title={{id:"AgreementValue",name:"Agreement Value"}} sub="Rs." min={100000} max={100000000} val={agreementValue} setVal={setAgreementValue}></RangeBox>
      <RangeBox title={{id:"RegistrationDate",name:"Registrati on Date"}} sub="" min={1984} max={2025} val={registrationdate} setVal={setRegistrationdate}></RangeBox>
    </>
  );
}
