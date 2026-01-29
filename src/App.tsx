import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar";
import { supabase } from "./lib/supabase-client";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { FaBookReader, FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from "react-router";

const App = () => {
  const location = useLocation()
  const [datas, setData] = useState([])
  const [datasPeminjam, setDataPeminjam] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("buku").select()
      setData(data)
    }

    const getDataPeminjam = async () => {
      const { data } = await supabase.from("peminjam").select().order('created_at', { ascending: false })
      setDataPeminjam(data)
    }

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session === null) {
        navigate("/")
      }
    }
    getDataPeminjam()
    getData()
    getSession()

  }, [navigate])
  
  const formatRelativeTime = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      
      const diffTime = new Date(now.toDateString()) - new Date(date.toDateString());
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 0) {
        return `Hari ini, ${dateString.slice(11, 16)}`;
      } else if (diffDays === 1) {
        return `Kemarin, ${dateString.slice(11, 16)}`;
      } else {
        return `${diffDays} hari yang lalu`;
      }
    }
  

  return (
    <div className="flex bg-zinc-50 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Navbar />
        <div className="p-5">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-600 w-fit p-2">{location.pathname}</span>
            <span className="text-2xl font-semibold">Dashboard</span>
            <span className="text-md text-zinc-800">Selamat Datang, Admin di Dashboard</span>
          </div>
          <div className="flex justify-center items-center p-8 w-fit">
            <div className="grid grid-cols-3 gap-8">
              <div className="max-w-sm flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md">
                <FaBookReader
                  className="absolute -top-6 -left-6 text-emerald-500/20 -z-10 w-32 h-32 -rotate-12"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-emerald-600 mb-2">Jumlah Buku</h3>
                  <p className="text-gray-500">Jumlah Buku yang tersedia di perpustakaan</p>
                </div>
                <div>
                  <span className="text-5xl font-bold text-emerald-500">{datas.length}</span>
                </div>
              </div>
              <div className="max-w-sm flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md">
                <FaUser
                  className="absolute -top-6 -left-6 text-blue-500/20 -z-10 w-32 h-32 -rotate-12"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Jumlah Peminjam</h3>
                  <p className="text-gray-500">Jumlah Siswa yang meminjam buku</p>
                </div>
                <div>
                  <span className="text-5xl font-bold text-blue-500">{datasPeminjam.length}</span>
                </div>
              </div>
              <div className="max-w-sm flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md">
                <FaUserFriends
                  className="absolute -top-6 -left-6 text-orange-500/20 -z-10 w-32 h-32 -rotate-12"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-orange-400 mb-2">Jumlah Pengunjung</h3>
                  <p className="text-gray-500">Jumlah Siswa yang berkunjung</p>
                </div>
                <div>
                  <span className="text-5xl font-bold text-orange-500">{datas.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 w-full shadow-md">
            <span className="font-semibold text-lg text-blue-500">Aktivitas</span>
            <div className="p-5 max-h-[260px] overflow-y-auto">
              {datasPeminjam.map((item) => {
                const isReturned = item.status === "Dikembalikan";
                return (
                  <div key={item.id} className="p-5 mt-5 flex justify-between items-center border border-zinc-200 bg-white rounded-lg">
                    <div className="flex flex-col">
                      <h1 className="text-zinc-600 font-medium text-sm">
                        {item.nama} {isReturned ? "telah mengembalikan" : "meminjam"} buku <span className="text-blue-500 underline">{item.judul_buku}</span>
                      </h1>
                      <span className="text-xs text-zinc-500">{formatRelativeTime(item.created_at)}</span>
                    </div>
                    <div className={`p-1.5 rounded-md text-xs w-fit ${isReturned ? "bg-emerald-500/20" : "bg-blue-500/20"}`}>
                      <span className={isReturned ? "text-emerald-600" : "text-blue-600"}>{item.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;