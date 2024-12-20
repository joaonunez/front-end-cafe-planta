import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import injectContext, { Context } from './store/context';
import Home from './views/home/Home';
import CustomerLoginView from './views/customer/CustomerLoginView';
import CustomerRegisterView from './views/customer/CustomerRegisterView';
import CustomerHome from './views/customer/CustomerHome';
import AdminHome from './views/admin/AdminHome';
import AdminLoginView from './views/admin/AdminLoginView';
import EmployeeHome from './views/employee/EmployeeHome'; // Importa la vista del home del empleado
import EmployeeLoginView from './views/employee/EmployeLoginView';
import ForgotPassword from './components/admin/ForgotPassword';

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige a login de cliente, administrador o empleado según el usuario
    if (!store.token) {
      if (window.location.pathname.startsWith("/admin")) {
        navigate('/admin-login');
      } else if (window.location.pathname.startsWith("/customer")) {
        navigate('/login');
      } else if (window.location.pathname.startsWith("/employee")) {
        navigate('/employee-login');
      }
    }
  }, [store.token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<CustomerLoginView />} />
      <Route path="/register" element={<CustomerRegisterView />} />
      
      {/* Rutas del cliente */}
      <Route path="/customer/*" element={<CustomerHome />} />

      {/* Rutas del administrador */}
      <Route path="/admin-login" element={<AdminLoginView />} />
      <Route path="/admin/*" element={<AdminHome />} />

      {/* Rutas del empleado */}
      <Route path="/employee-login" element={<EmployeeLoginView />} />
      <Route path="/employee/*" element={<EmployeeHome />} />
    

      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default injectContext(App);
