import { Backdrop, Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Backdrop/>
      <Header />
      <main
        className="flex-grow max-w-7xl mx-auto w-full mt-30"
        aria-label="Main content"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
