import React, { useEffect } from 'react';
import useBusqueda from '../hooks/useBusqueda';

export const Favoritos = () => {
  const { obtenerListaFavoritos, eliminarFavorito, favoritos } = useBusqueda();
  useEffect(() => {
    obtenerListaFavoritos();
  }, []);

  return (
    <div className='container mx-auto md:grid grid-cols-3 gap-5'>
      {favoritos.map((dato) => (
        <div
          key={dato.favoritoKey}
          className='max-w-sm w-auto bg-white rounded-lg border border-gray-200 shadow-md gap-5'>
          <a>
            <img className='rounded-t-lg' src={dato.urlImg} alt='' />
          </a>
          <div className='p-5'>
            <a>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
                {dato.title}
              </h5>
            </a>
            <p className='mb-3 font-normal text-gray-700 '>
              <span className='bg-indigo-100 text-indigo-800 text-sm font-medium mt-10 px-2.5 py-0.5 rounded'>
                {dato.principalOrFirstMaker}
              </span>
            </p>

            <a
              className='inline-flex items-center py-2 px-3 text-sm font-medium cursor-pointer text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
              onClick={() => eliminarFavorito(dato.favoritoKey)}>
              Eleminar de favoritos
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
