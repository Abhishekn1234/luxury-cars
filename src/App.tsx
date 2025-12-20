import {  Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/AppLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SellingCar from "./pages/Sellingcar/Sellingcar";


// future pages
// import AboutPage from "./pages/About/About";
// import CarsPage from "./pages/Cars/Cars";
// import ContactPage from "./pages/Contact/Contact";

function App() {
  return (
 
      <Routes>
        {/* Layout Route */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          {/* Future Routes */}
          <Route path="/about" element={<About />} />
          {/* <Route path="/cars" element={<CarsPage />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/selling" element={<SellingCar/>}/>
        </Route>
      </Routes>
    
  );
}

export default App;

