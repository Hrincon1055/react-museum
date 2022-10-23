import { useState, useEffect, createContext } from 'react';
import axiosMuseum from '../config/axiosMuseum';
import confetti from 'canvas-confetti';
import { toast } from 'react-hot-toast';
// MIS COMPONENTES

const BusquedaContext = createContext();

const BusquedaProvider = ({ children }) => {
  const [datosBusqueda, setDatosBusqueda] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [cargandoBusqueda, setCargandoBusqueda] = useState(false);
  const buscarObras = async (nombreObra, nombreArtista) => {
    let obra;
    let artista;
    if (nombreObra === '') {
      obra = 'null';
    } else {
      obra = nombreObra;
    }
    if (nombreArtista === '') {
      artista = 'null';
    } else {
      artista = nombreArtista;
    }
    try {
      setCargandoBusqueda(true);
      const { data } = await axiosMuseum.get(
        `/museum/busqueda/${obra}/${artista}`
      );
      setDatosBusqueda(data);
    } catch (error) {
      setDatosBusqueda([]);
      console.log(`ERROR: ${error.response.data.msg}`);
    } finally {
      setCargandoBusqueda(false);
    }
  };
  const agregarAFaborito = async (
    favoritoKey,
    title,
    principalOrFirstMaker,
    urlImg
  ) => {
    try {
      const { data } = await axiosMuseum.post(`/favorito`, {
        favoritoKey,
        title,
        principalOrFirstMaker,
        urlImg,
      });
      if (data.ok === true) {
        confetti({
          zIndex: 99999,
          particleCount: 300,
          angle: -100,
          origin: {
            x: 1,
            y: 0,
          },
        });
      } else {
        toast.error('Ya esta guardado en tus favoritos');
      }
    } catch (error) {
      toast.error('Ya esta guardado en tus favoritos');
      console.log(`ERROR: ${error.response.data.msg}`);
    }
  };
  const obtenerListaFavoritos = async () => {
    try {
      setCargandoBusqueda(true);
      const { data } = await axiosMuseum.get(`/favorito`);
      setFavoritos(data.favoritos);
    } catch (error) {
      console.log(`ERROR: ${error.response.data.msg}`);
      setFavoritos([]);
    } finally {
      setCargandoBusqueda(false);
    }
  };
  const eliminarFavorito = async (favoritoKey) => {
    try {
      setCargandoBusqueda(true);
      const { data } = await axiosMuseum.delete(`/favorito/${favoritoKey}`);
      if (data.ok === true) {
        obtenerListaFavoritos();
        toast.success('Favorito eliminado correctamente.');
      }
    } catch (error) {
      console.log(`ERROR: ${error.response.data.msg}`);
    } finally {
      setCargandoBusqueda(false);
    }
  };
  // RENDER
  return (
    <>
      <BusquedaContext.Provider
        value={{
          datosBusqueda,
          cargandoBusqueda,
          favoritos,
          buscarObras,
          agregarAFaborito,
          obtenerListaFavoritos,
          eliminarFavorito,
        }}>
        {children}
      </BusquedaContext.Provider>
    </>
  );
};

export { BusquedaProvider };
export default BusquedaContext;
