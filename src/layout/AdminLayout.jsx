import { Outlet, Navigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import useAuth from '../hooks/useAuth';
import useBusqueda from '../hooks/useBusqueda';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import { Toaster } from 'react-hot-toast';
export const AdminLayout = () => {
  const { auth, cargando } = useAuth();
  const { cargandoBusqueda } = useBusqueda();
  if (cargando) {
    return <Spinner />;
  }
  return (
    <>
      {cargandoBusqueda && <Spinner />}
      <Header />
      <main
        style={{ minHeight: 'calc(100vh - 188px)' }}
        className='container mx-auto mt-10 mb-5'>
        {auth?.uid ? <Outlet /> : <Navigate to='/' />}
      </main>
      <Footer />
      <Toaster position='top-right' />
    </>
  );
};
