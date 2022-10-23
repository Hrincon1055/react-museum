import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Header = () => {
  const { cerrarSesion } = useAuth();
  return (
    <header className='py-5 bg-indigo-600'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <h1 className='fort-bold text-2xl text-indigo-200 text-center'>
          <Link to='/search'>MUSEUM</Link>
        </h1>
        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
          <Link
            className='text-white text-sm uppercase font-bold '
            to='/search/favoritos'>
            Favoritos
          </Link>
          <Link
            className='text-white text-sm uppercase font-bold '
            to='/search/perfil'>
            Perfil
          </Link>
          <button
            type='button'
            onClick={cerrarSesion}
            className='text-white text-sm uppercase font-bold'>
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};
