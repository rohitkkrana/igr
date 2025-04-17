import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withPermission(WrappedComponent, requiredPermission) {
  return function WithPermissionComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'authenticated' && session?.user?.permissions) {
        const hasPermission = session.user.permissions.some(
          p => p.name === requiredPermission
        );

        if (!hasPermission) {
          router.push('/dashboard');
        }
      }
    }, [session, status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
      router.push('/login');
      return null;
    }

    const hasPermission = session?.user?.permissions?.some(
      p => p.name === requiredPermission
    );

    if (!hasPermission) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 