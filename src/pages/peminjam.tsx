import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { BsDatabaseExclamation } from "react-icons/bs";

interface PeminjamData {
  id: number;
  nama: string;
  judul_buku: string;
  kelas: string;
  jadwal_pengembalian: string;
  status: string;
  created_at?: string;
}

const Peminjam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataPeminjamEmpty, setDataPeminjamEmpty] = useState(false);
  const [datasPeminjam, setDataPeminjam] = useState<PeminjamData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [showAlert, setShowAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);

  const [nama, setNama] = useState("");
  const [judulBuku, setJudulBuku] = useState("");
  const [kelas, setKelas] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [status, setStatus] = useState("Dipinjam");

  const getDataPeminjam = async () => {
    const { data } = await supabase.from("peminjam").select("*").order("id", { ascending: false });
    if (data) {
      setDataPeminjam(data as PeminjamData[]);
      setDataPeminjamEmpty(data.length === 0);
    } else {
      setDataPeminjam([]);
      setDataPeminjamEmpty(true);
    }
  };

  const confirmDelete = (id: number) => {
    setIdToDelete(id);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    if (!idToDelete) return;
    const { error } = await supabase.from("peminjam").delete().eq("id", idToDelete);
    if (!error) {
      const updatedData = datasPeminjam.filter((item) => item.id !== idToDelete);
      setDataPeminjam(updatedData);
      if (updatedData.length === 0) setDataPeminjamEmpty(true);
    }
    setShowAlert(false);
    setIdToDelete(null);
  };

  const handleEdit = (item: PeminjamData) => {
    setIsEdit(true);
    setCurrentId(item.id);
    setNama(item.nama);
    setJudulBuku(item.judul_buku);
    setKelas(item.kelas);
    setJadwal(item.jadwal_pengembalian);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsEdit(false);
    setCurrentId(null);
    setNama("");
    setJudulBuku("");
    setKelas("");
    setJadwal("");
    setStatus("Dipinjam");
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nama,
      judul_buku: judulBuku,
      kelas,
      jadwal_pengembalian: jadwal,
      status,
    };

    if (isEdit && currentId) {
      const { error } = await supabase.from("peminjam").update(payload).eq("id", currentId);
      if (error) alert(error.message);
      else {
        setDataPeminjam(datasPeminjam.map((item) => (item.id === currentId ? { ...item, ...payload } : item)));
        resetForm();
      }
    } else {
      const { data, error } = await supabase.from("peminjam").insert([payload]).select();
      if (error) alert(error.message);
      else if (data) {
        setDataPeminjam([data[0] as PeminjamData, ...datasPeminjam]);
        setDataPeminjamEmpty(false);
        resetForm();
      }
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/");
    };
    checkSession();
    getDataPeminjam();
  }, [navigate]);

  return (
    <div className="flex bg-zinc-50 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Navbar />
        <div className="p-5">
          {showAlert && (
            <div className="fixed inset-0 z-[60] grid place-content-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Konfirmasi Hapus</h2>
                <div className="mt-4">
                  <p className="text-gray-700">Apakah Anda yakin ingin menghapus data ini?</p>
                </div>
                <footer className="mt-6 flex justify-end gap-2">
                  <button onClick={() => setShowAlert(false)} className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Batal</button>
                  <button onClick={handleDelete} className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Hapus</button>
                </footer>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-blue-500 sm:text-2xl">{isEdit ? "Edit Data" : "Tambah Data"}</h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 w-90 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Nama Peminjam</label>
                    <input value={nama} onChange={(e) => setNama(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Judul Buku</label>
                    <input value={judulBuku} onChange={(e) => setJudulBuku(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Kelas</label>
                    <input value={kelas} onChange={(e) => setKelas(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Jadwal Pengembalian</label>
                    <input value={jadwal} onChange={(e) => setJadwal(e.target.value)} type="date" required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500 bg-white">
                      <option value="Dipinjam">Dipinjam</option>
                      <option value="Dikembalikan">Dikembalikan</option>
                    </select>
                  </div>
                  <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold mt-2">Simpan</button>
                </form>
              </div>
            </div>
          )}

          <div className="p-8 w-full shadow-md bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-blue-500 uppercase">Data Peminjam</span>
              <button onClick={() => { setIsEdit(false); setIsModalOpen(true); }} className="bg-blue-500 text-sm p-2 rounded-md text-white font-medium hover:bg-blue-600">Tambah Data</button>
            </div>
            <div className="p-5 max-h-[500px] overflow-y-auto mt-4">
              {dataPeminjamEmpty ? (
                <div className="flex p-5 justify-center gap-4 items-center flex-col">
                  <BsDatabaseExclamation fontSize={45} className="text-zinc-500" />
                  <span className="text-zinc-500">Belum ada data!</span>
                </div>
              ) : (
                datasPeminjam.map((item) => (
                  <div key={item.id} className="p-5 mt-5 flex justify-between items-center border border-zinc-200 bg-white rounded-lg shadow-sm">
                    <div className="flex gap-4 items-center">
                      <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                        {item.nama?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-zinc-800 font-bold text-sm">{item.nama}</h1>
                        <span className="text-xs text-zinc-500">Buku: {item.judul_buku}</span>
                        <span className={`text-xs font-bold ${item.status === "Dipinjam" ? "text-orange-500" : "text-green-500"}`}>{item.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-xs p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                      <button onClick={() => confirmDelete(item.id)} className="text-xs p-2 bg-red-500 text-white rounded hover:bg-red-600">Hapus</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peminjam;