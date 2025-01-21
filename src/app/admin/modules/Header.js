import React from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link href="/admin" className="btn btn-ghost text-xl">Prop IQX</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                width={100}
                height={100}
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href='/admin/user/profile' className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={() => signOut()}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
