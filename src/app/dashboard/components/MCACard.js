'use client';

import { Icon } from "@iconify/react";

export default function MCACard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4  w-1/3">
      <h2 className="text-lg font-bold mb-4">MCA</h2>
      <div className="space-y-8">
        {/* Company 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="ph:buildings-fill" className="text-gray-500 text-2xl" />
            <span className="text-gray-900 text-sm font-medium">Company</span>
          </div>
          <span className="text-gray-900 text-sm font-medium">125254</span>
        </div>
        
        {/* Company 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="ph:users-fill" className="text-gray-500 text-2xl" />
            <span className="text-gray-900 text-sm font-medium">Company</span>
          </div>
          <span className="text-gray-900 text-sm font-medium">125254</span>
        </div>

        {/* Charges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon icon="ph:credit-card-fill" className="text-gray-500 text-2xl" />
            <span className="text-gray-900 text-sm font-medium">Charges</span>
          </div>
          <span className="text-gray-900 text-sm font-medium">125254</span>
        </div>
      </div>
    </div>
  );
}
