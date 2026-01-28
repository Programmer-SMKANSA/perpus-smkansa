import { IoHome } from "react-icons/io5";
import { FaBook, FaUser, FaUserFriends } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { supabase } from "../lib/supabase-client";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Sidebar = () => {

  const navigate = useNavigate()
  const [isSidebar, setSidebar] = useState(false);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    navigate("/")
  }
  
  return (
    <div className="bg-zinc-900 w-90 h-screen flex flex-col">
      <div className="flex gap-4 items-center bg-blue-800">
        <img className="w-16 h-18 p-2" src="https://smkn1sumbawa.sch.id/wp-content/uploads/2022/08/Logo-SMKN-1.png" />
        <span className="text-white text-lg">Perpustakaan SMKANSA</span>
      </div>
      <div className="flex flex-col gap-7 p-5 bg-zinc-800 flex-1">
        <Link className="flex items-center gap-3 text-white hover:text-zinc-300" to="/dashboard"><IoHome className="text-blue-500 text-lg"/>Dashboard</Link>
                <Link className="flex items-center gap-3 text-white hover:text-zinc-300" to="/buku"><FaBook className="text-emerald-500 text-lg"/>Data Buku</Link>
                <Link className="flex items-center gap-3 text-white hover:text-zinc-300" to="/peminjam"><FaUser className="text-white text-lg"/>Data Peminjam</Link>
                <Link className="flex items-center gap-3 text-white hover:text-zinc-300" to="/pengunjung"><FaUserFriends className="text-orange-500 text-lg"/>Data Pengunjung</Link>
                <Link className="flex items-center gap-3 text-white hover:text-zinc-300" to="/Laporan"><GoReport className="text-red-500 text-2xl"/>Laporan</Link>
      </div>
      <div className="flex flex-col gap-4 bg-zinc-800 py-3 p-2">
      <div className="flex flex-col gap-4 bg-zinc-800 p-2">
        <button onClick={handleLogout} className=" text-red-500 flex gap-3 items-center hover:text-red-600"><BiLogOut/> Log Out</button>
      </div>
      </div>
    </div>
  )
}


export default Sidebar;