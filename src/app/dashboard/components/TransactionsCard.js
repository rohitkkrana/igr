'use client';

import { Icon } from "@iconify/react";
import Image from "next/image";

export default function TransactionsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8  w-1/3">
      {/* Header Section */}
      <div className="mb-2 flex justify-end">
      <Icon icon="entypo:dots-three-vertical"  />
      </div>
     
     <Image src="/assets/images/transactions.png" width={50} height={50} alt="Project" className="mb-4" />
        
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center  gap-2">
          
          <span className="text-lg font-semibold">Transactions</span>
        </div>
        <span className="text-lg font-bold">1345236</span>
        
      </div>
      {/* Grid Section */}
      <div className="flex item-center justify-center gap-16 text-center mb-4">
        <div>
          <Icon icon="fluent:home-24-filled" style={{fontSize:"3.5rem"}} />
          <div className="text-sm font-semibold">Home</div>
          <div className="text-sm text-gray-500">1236528</div>
        </div>
        <div className="text-center ">
          <Icon icon="stash:shop-duotone" style={{fontSize:"4rem"}} />         
          <div className="text-sm font-semibold">Commercial</div>
          <div className="text-sm text-gray-500">1236528</div>
        </div>
        <div>
         <Icon icon="ic:outline-other-houses" style={{fontSize:"3.5rem"}} />
          <div className="text-sm font-semibold">Others</div>
          <div className="text-sm text-gray-500">1236528</div>
        </div>
      </div>
    </div>
  );
}
