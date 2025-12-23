import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/AppLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SellingCar from "./pages/Sellingcar/Sellingcar";
import Collections from "./pages/Collections/Collections";
import Services from "./pages/Services/Services";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // don't forget to import CSS

function App() {
  return (
    <>
      <Routes>
        {/* Layout Route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Future Routes */}
          <Route path="/about" element={<About />} />
          {/* <Route path="/cars" element={<CarsPage />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/selling" element={<SellingCar />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>

      {/* Toast container added here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // you can use "dark" or "colored"
      />
    </>
  );
}

export default App;
