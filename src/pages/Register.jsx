import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axiosMuseum';
/** Inicio */
export const Register = () => {
  // STATE
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  // CONSTANTES
  const { msg } = alerta;
  // FUNCIONES
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Hay campos vacios.',
        error: true,
      });
      return;
    } else if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son iguales.',
        error: true,
      });
      return;
    } else if (password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto, agrege minimo 6 caracteres.',
        error: true,
      });
      return;
    } else {
      setAlerta({});
      try {
        await clienteAxios.post('/auth/new', {
          name,
          email,
          password,
        });
        setAlerta({
          msg: 'Usuario creado.',
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
  };
  /** Render */
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Crea tu cuenta</h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Tu nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email de registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Password
            </label>
            <input
              type='password'
              placeholder='Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Repetir Password
            </label>
            <input
              type='password'
              placeholder='Repite tu Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type='submit'
            value='Crear Cuenta'
            className='inline-block px-7 py-3 bg-indigo-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:cursor-pointer hover:bg-indigo-800  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full'
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to='/'>
            ¿Ya tienes una cuenta? Inicia Sesión.
          </Link>
        </nav>
      </div>
    </>
  );
};
