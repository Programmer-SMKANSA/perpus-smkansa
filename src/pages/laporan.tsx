import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { FaBookReader, FaUser, FaUserFriends } from "react-icons/fa";

const Laporan = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBuku: 0,
    totalPeminjam: 0,
    totalPengunjung: 0,
    bukuDipinjam: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: bukuCount } = await supabase.from("buku").select("*", { count: 'exact', head: true });
      const { data: peminjamData } = await supabase.from("peminjam").select("status");
      const dipinjam = peminjamData?.filter(item => item.status === "Dipinjam").length || 0;
      const { count: pengunjungCount } = await supabase.from("pengunjung").select("*", { count: 'exact', head: true });

      setStats({
        totalBuku: bukuCount || 0,
        totalPeminjam: peminjamData?.length || 0,
        totalPengunjung: pengunjungCount || 0,
        bukuDipinjam: dipinjam
      });
    };

    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/");
    };

    getSession();
    fetchStats();
  }, [navigate]);

  return (
    <div className="flex bg-zinc-50 min-h-screen overflow-hidden">
      <style>
        {`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; }
            .flex-1 { overflow: visible !important; height: auto !important; }
            .shadow-md { box-shadow: none !important; border: 1px solid #e4e4e7 !important; }
            @page { size: A4; margin: 1cm; }
          }
        `}
      </style>

      <div className="no-print">
        <Sidebar />
      </div>

      <div className="flex-1 h-screen overflow-y-auto bg-zinc-50 print:bg-white">
        <div className="no-print">
          <Navbar />
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 pb-6">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-zinc-900 uppercase">Laporan Perpustakaan</h1>
              <p className="text-zinc-500">Rekapitulasi data koleksi dan sirkulasi buku</p>
            </div>
            
            <div className="text-right">
              <button 
                onClick={() => window.print()}
                className="no-print flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg transition-all font-semibold shadow-lg"
              >
                <BsFileEarmarkPdf size={20} /> Ekspor PDF
              </button>
              <p className="hidden print:block text-sm text-zinc-400">
                Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md border border-zinc-100">
              <FaBookReader className="absolute -top-6 -left-6 text-emerald-500/20 -z-10 w-32 h-32 -rotate-12" />
              <div className="flex flex-col">  
                <h3 className="text-lg font-bold text-emerald-600 mb-1">Total Buku</h3>
                <p className="text-gray-400 text-xs">Koleksi Tersedia</p>
              </div>
              <span className="text-4xl font-bold text-emerald-500">{stats.totalBuku}</span>
            </div>

            <div className="flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md border border-zinc-100">
              <FaUser className="absolute -top-6 -left-6 text-blue-500/20 -z-10 w-32 h-32 -rotate-12" />
              <div className="flex flex-col">  
                <h3 className="text-lg font-bold text-blue-600 mb-1">Peminjam</h3>
                <p className="text-gray-400 text-xs">Total Riwayat</p>
              </div>
              <span className="text-4xl font-bold text-blue-500">{stats.totalPeminjam}</span>
            </div>

            <div className="flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md border border-zinc-100">
              <FaBookReader className="absolute -top-6 -left-6 text-red-500/20 -z-10 w-32 h-32 -rotate-12" />
              <div className="flex flex-col">  
                <h3 className="text-lg font-bold text-red-600 mb-1">Dipinjam</h3>
                <p className="text-gray-400 text-xs">Buku di Luar</p>
              </div>
              <span className="text-4xl font-bold text-red-500">{stats.bukuDipinjam}</span>
            </div>

            <div className="flex items-center justify-between relative p-6 bg-white rounded-xl z-10 overflow-hidden shadow-md border border-zinc-100">
              <FaUserFriends className="absolute -top-6 -left-6 text-orange-500/20 -z-10 w-32 h-32 -rotate-12" />
              <div className="flex flex-col">  
                <h3 className="text-lg font-bold text-orange-400 mb-1">Pengunjung</h3>
                <p className="text-gray-400 text-xs">Trafik Siswa</p>
              </div>
              <span className="text-4xl font-bold text-orange-500">{stats.totalPengunjung}</span>
            </div>
          </div>

          <div className="p-8 w-full shadow-md bg-white rounded-lg border border-zinc-200">
            <span className="font-semibold text-lg text-blue-500 block mb-4 uppercase">Detail Operasional</span>
            <table className="w-full text-left">
              <tbody>
                <TableRow label="Total Inventaris Buku" value={`${stats.totalBuku} Judul`} />
                <TableRow label="Buku Sedang Dipinjam" value={`${stats.bukuDipinjam} Unit`} />
                <TableRow label="Buku Tersedia di Rak" value={`${stats.totalBuku - stats.bukuDipinjam} Unit`} />
                <TableRow label="Total Pengunjung Perpustakaan" value={`${stats.totalPengunjung} Orang`} />
                <TableRow label="Status Sistem" value="Terhubung (Supabase)" />
              </tbody>
            </table>
          </div>

          <div className="hidden print:block mt-24">
            <div className="flex justify-end">
              <div className="text-center w-64 pt-2">
                <p className="text-sm text-zinc-900 mb-20">Petugas Perpustakaan,</p>
                <p className="text-sm font-bold text-zinc-900 underline uppercase">( .................................... )</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border-b border-zinc-100 last:border-0">
    <td className="py-4 text-sm text-zinc-500 font-medium">{label}</td>
    <td className="py-4 text-sm text-zinc-900 font-bold text-right">{value}</td>
  </tr>
);

export default Laporan;