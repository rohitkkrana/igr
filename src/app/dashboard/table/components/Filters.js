import React from 'react'
import { Icon } from '@iconify/react';
const Filters =()=> {
  return (
    <div className="flex justify-between items-center">
              <input type="text" placeholder="Search" className="input input-sm input-bordered w-1/4 text-sm/6 font-medium" />
              <div className="flex gap-2">
                
                <button className="btn btn-outline  btn-sm">Filter <Icon icon="proicons:filter" style={{ fontSize: '18px', color:'#64748B' }} /></button>
                <button className="btn btn-outline  btn-sm">Export  <Icon icon="prime:download" style={{ fontSize: '18px', color:'#64748B' }} /></button>
                <button className="btn btn-primary  btn-sm">Add Customer <Icon icon="ic:round-plus" style={{ fontSize: '18px', color:'#FFFFFF' }} /></button>
              </div>
            </div>
  )
}
export default Filters;