import { useAuth } from '@/redux/hooks/useAuth';
import { ReactComponentElement, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '@thirdweb-dev/react';

export function ProtectedRoute({
  children
}: {
  children: ReactComponentElement<any>;
}) {
  const location = useLocation();
  const { isLoggedIn, isLoading } = useUser();

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setAuth(false);
    }
  }, [isLoggedIn, isLoading]);

  if (!auth) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/" state={{ from: location }} />;
  }

  // authorized so return child components
  return children;
}
