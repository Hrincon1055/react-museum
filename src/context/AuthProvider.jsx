import { useState, useEffect, createContext } from 'react';
import axiosMuseum from '../config/axiosMuseum';
// MIS COMPONENTES

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // STATE
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  // EFFECT
  useEffect(() => {
    const renewTokenUsuario = async () => {
      const token = localStorage.getItem('token-museum');
      if (!token) {
        setCargando(false);
        return;
      }
      try {
        const { data } = await axiosMuseum.get('/auth/renew');
        setAuth(data);
      } catch (error) {
        console.log(`ERROR: ${error.response.data.msg}`);
        setAuth({});
      }
      setCargando(false);
    };
    renewTokenUsuario();
  }, []);
  const cerrarSesion = () => {
    localStorage.removeItem('token-museum');
    setAuth({});
  };

  // RENDER
  return (
    <>
      <AuthContext.Provider
        value={{
          auth,
          setAuth,
          cargando,
          cerrarSesion,
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthProvider };
export default AuthContext;
