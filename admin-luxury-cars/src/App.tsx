
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import Cars from './pages/Cars';
import Services from './pages/Services';
import Users from './pages/Users';

import Layout from './components/Layout';
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes wrapped with Layout */}
     <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
  <Route path="/" element={<Home />} />
  <Route path="/cars" element={<Cars />} />
  <Route path="/services" element={<Services />} />
  <Route path="/users" element={<Users />} />
  
</Route>

      </Routes>
    </Router>
    </>
     
  );
}

export default App;
