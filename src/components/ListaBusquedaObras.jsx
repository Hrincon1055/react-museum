import React from 'react';
import useBusqueda from '../hooks/useBusqueda';

export const ListaBusquedaObras = () => {
  const { datosBusqueda, agregarAFaborito } = useBusqueda();
  if (datosBusqueda.length === 0) {
    return (
      <div
        className='p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg '
        role='alert'>
        <span className='font-medium'>Info </span> Realiza una búsqueda para
        obtener tus obras favoritas
      </div>
    );
  }
  const agregarFaorito = (
    e,
    favoritoKey,
    title,
    principalOrFirstMaker,
    urlImg
  ) => {
    e.preventDefault();
    agregarAFaborito(favoritoKey, title, principalOrFirstMaker, urlImg);
  };
  return (
    <div className='container mx-auto md:grid grid-cols-3 gap-5'>
      {datosBusqueda.obras.map((dato) => (
        <div
          key={dato.id}
          className='max-w-sm w-auto bg-white rounded-lg border border-gray-200 shadow-md gap-5'>
          <a href={dato.links.web} target='_blank'>
            <img className='rounded-t-lg' src={dato.webImage.url} alt='' />
          </a>
          <div className='p-5'>
            <a>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
                {dato.title}
              </h5>
            </a>
            <p className='mb-3 font-normal text-gray-700 '>
              {dato.longTitle} <br />
              <span className='bg-indigo-100 text-indigo-800 text-sm font-medium mt-10 px-2.5 py-0.5 rounded'>
                {dato.principalOrFirstMaker}
              </span>
            </p>

            <a
              className='inline-flex items-center py-2 px-3 text-sm font-medium cursor-pointer text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
              onClick={(e) =>
                agregarFaorito(
                  e,
                  dato.id,
                  dato.title,
                  dato.principalOrFirstMaker,
                  dato.webImage.url
                )
              }>
              Agregar a favoritos
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
