import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axiosMuseum from '../config/axiosMuseum';
import useBusqueda from '../hooks/useBusqueda';

export const FormSearch = () => {
  const { buscarObras } = useBusqueda();
  const [textSearchNameArtista, setTextSearchNameArtista] = useState('');
  const [textSearchNameTitle, setTextSearchNameTitle] = useState('');
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
    setTextSearchNameArtista(value.value);
  };

  const fetchUsers = () => {
    if (inputValue.length > 2 || inputValue !== '') {
      return axiosMuseum.get(`/museum/${inputValue}`).then((result) => {
        const res = result.data.artistas;
        return res;
      });
    }
    setTextSearchNameArtista('');
  };
  const handleClick = (e) => {
    e.preventDefault();
    buscarObras(textSearchNameTitle, textSearchNameArtista);
  };

  return (
    <form className='flex items-center' onSubmit={handleClick}>
      <div className='container mx-auto md:grid grid-cols-3 md:gap-6'>
        <label className='sr-only'>Search</label>
        <div className='relative z-0 mb-6 w-full group'>
          <div className='relative w-full'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'></path>
              </svg>
            </div>
            <input
              type='text'
              id='voice-search'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  '
              placeholder='Search...'
              value={textSearchNameTitle}
              onChange={(e) => setTextSearchNameTitle(e.target.value)}
            />
          </div>
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedValue}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            loadOptions={fetchUsers}
            onInputChange={handleInputChange}
            onChange={handleChange}
          />
        </div>
        <div className='relative z-0 mb-6 w-full group'>
          <button
            type='submit'
            className='inline-flex items-center py-2 px-3 text-sm font-medium text-white bg-indigo-600 rounded-lg border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full text-center'>
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
