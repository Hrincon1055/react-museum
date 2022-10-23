import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { BusquedaProvider } from './context/BusquedaProvider';
import { AdminLayout } from './layout/AdminLayout';
import { AuthLayout } from './layout/AuthLayout';
import { Favoritos } from './pages/Favoritos';
import { Login } from './pages/Login';
import { Perfil } from './pages/Perfil';
import { Register } from './pages/Register';
import { Search } from './pages/Search';
/** Inicio */
function App() {
  /** Render */
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusquedaProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Routes>
          <Routes>
            <Route path='/search' element={<AdminLayout />}>
              <Route index element={<Search />} />
              <Route path='favoritos' element={<Favoritos />} />
              <Route path='perfil' element={<Perfil />} />
            </Route>
          </Routes>
        </BusquedaProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
