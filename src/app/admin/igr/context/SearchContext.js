"use client";
import { createContext } from 'react';

const defaultSearchContext = {
  city: [],
  setCity: () => {},

  productType: [],
  setProductType: () => {},

  micromarket: [],
  setMicromarket: () => {},

  pincode: [],
  setPincode: () => {},

  projectName: [],
  setProjectName: () => {},

  buildingName: [],
  setBuildingName: () => {},

  registrationdate: { min: "", max: "" },
  setRegistrationdate: () => {},

  area: { min: "", max: "" },
  setArea: () => {},

  price: { min: "", max: "" },
  setPrice: () => {},

  agreementValue: { min: "", max: "" },
  setAgreementValue: () => {},
};

const SearchContext = createContext(defaultSearchContext); // ✅ Default value provided

export default SearchContext;
