import React from 'react';
import useAuth from '../hooks/useAuth';

export const Perfil = () => {
  const { auth } = useAuth();
  return (
    <div className='container mx-auto md:grid grid-cols-3 gap-5'>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
};
