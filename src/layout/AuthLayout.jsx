import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
/** Inicio */
export const AuthLayout = () => {
  const { auth } = useAuth();
  /** Render */
  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center'>
        {auth?.uid ? <Navigate to='/search' /> : <Outlet />}
      </main>
    </>
  );
};
