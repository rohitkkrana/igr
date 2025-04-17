'use client';

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProjectCard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [counts, setCounts] = useState({
    total: 0,
    commercial: 0,
    residential: 0,
    others: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/igr');
        
        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch data');
        }

        // Process buyer type counts from the GROUP BY results
        const commercial = data.buyerTypes
          .filter(type => ['Company', 'Association'].includes(type.type))
          .reduce((sum, type) => sum + parseInt(type.count), 0);

        const residential = data.buyerTypes
          .find(type => type.type === 'Individual')?.count || 0;

        const others = data.buyerTypes
          .filter(type => !['Company', 'Association', 'Individual'].includes(type.type))
          .reduce((sum, type) => sum + parseInt(type.count), 0);

        setCounts({
          total: data.total,
          commercial,
          residential,
          others
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 w-1/3">
        <div className="flex items-center justify-center h-full">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 w-1/3">
        <div className="text-red-500 text-center">
          {status === 'unauthenticated' ? 'Please login to view data' : `Error: ${error}`}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 w-1/3">
      {/* Header Section */}
      <div className="mb-2 flex justify-end">
        <Icon icon="entypo:dots-three-vertical" />
      </div>
     
      <Image src="/assets/images/project.png" width={50} height={50} alt="Project" className="mb-4" />
          
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Projects</span>
        </div>
        <span className="text-lg font-bold">{counts.total.toLocaleString()}</span>
      </div>
      {/* Grid Section */}
      <div className="flex item-center justify-center gap-16 text-center mb-4">
        <div>
          <Link href={`/dashboard/table`}>
            <Icon icon="fluent:home-24-filled" style={{fontSize:"3.5rem"}} />
            <div className="text-sm font-semibold">Home</div>
            <div className="text-sm text-gray-500">{(counts.residential-1273).toLocaleString()}</div>
          </Link>
        </div>
        <div className="text-center">
          <Link href={`/dashboard/table`}>
            <Icon icon="stash:shop-duotone" style={{fontSize:"4rem"}} />         
            <div className="text-sm font-semibold">Commercial</div>
            <div className="text-sm text-gray-500">{counts.commercial.toLocaleString()}</div>
          </Link>
        </div>
        <div>
          <Link href={`/dashboard/table`}>
            <Icon icon="ic:outline-other-houses" style={{fontSize:"3.5rem"}} />
            <div className="text-sm font-semibold">Others</div>
            <div className="text-sm text-gray-500">{counts.others.toLocaleString()}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
