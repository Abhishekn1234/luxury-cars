import { Outlet } from "react-router-dom";
import AppNavbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
