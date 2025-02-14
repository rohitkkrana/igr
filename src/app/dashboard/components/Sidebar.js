import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-base-100  fixed">
      <div className="drop-shadow-md  h-16 border-b  flex items-center pt-4  justify-center">
        <h2 className="text-xl font-bold mb-4 flex gap-x-5">
          <Icon icon="vaadin:lines" style={{ fontSize: '24px', color:'#64748B' }} />
          <Image src="/assets/images/logo.png" width={28} height={28} alt="PropIOX" />Prop IQX</h2>
      </div>
      <div className="flex flex-col justify-end p-4">
        <nav className="space-y-2">
          <Link href="/dashboard" className="btn btn-ghost w-full flex justify-start text-slate-500">
            <Icon icon="fluent:grid-20-regular" style={{ fontSize: '24px' }} />
            Dashboard
          </Link>
          <Link href="#" className="btn btn-ghost w-full flex justify-start  text-slate-500">
            <Icon icon="flowbite:briefcase-outline" style={{ fontSize: '24px' }} />
            Company
          </Link>
          <Link href="#" className="btn btn-ghost w-full flex justify-start  text-slate-500">
            <Icon icon="pajamas:project" style={{ fontSize: '24px' }} />
            Project
          </Link>
          <Link href="#" className="btn btn-ghost w-full flex justify-start text-slate-500">
            <Icon icon="iconoir:building" style={{ fontSize: '24px' }} />
            Properties
          </Link>
          <Link href="#" className="btn btn-ghost w-full flex justify-start text-slate-500">
            <Icon icon="circum:dollar" style={{ fontSize: '24px' }} />
            Transactions
          </Link>
          <div className="divider"></div>
        </nav>
        <nav className="space-y-2">
          <Link href="#" className="btn btn-ghost w-full flex justify-start  text-slate-500">
          <Icon icon="bi:gear" style={{ fontSize: '24px' }} />
            Settings
          </Link> 
          <Link href="#"  onClick={() => signOut()} className="btn btn-ghost w-full flex justify-start text-error">
          <Icon icon="humbleicons:logout" style={{ fontSize: '24px' }} />
            Log Out
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
