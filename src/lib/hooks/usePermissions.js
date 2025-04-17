import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function usePermissions() {
  const { data: session, status } = useSession();
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.permissions) {
      setPermissions(session.user.permissions);
    }
    setIsLoading(false);
  }, [session, status]);

  const hasPermission = (permissionName) => {
    if (isLoading) return false;
    return permissions.some(p => p.name === permissionName);
  };

  const hasModulePermission = (module) => {
    if (isLoading) return false;
    return permissions.some(p => p.module === module);
  };

  return {
    permissions,
    isLoading,
    hasPermission,
    hasModulePermission
  };
} 