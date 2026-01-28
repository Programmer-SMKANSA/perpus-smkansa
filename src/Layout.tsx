import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="flex bg-zinc-50 min-h-screen">
      {/* Sidebar hanya dipanggil SEKALI di sini */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        {/* Area ini akan berubah isinya sesuai URL, tapi Sidebar & Navbar tetap diam */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;