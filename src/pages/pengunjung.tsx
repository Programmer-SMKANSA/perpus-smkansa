import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { BsDatabaseExclamation } from "react-icons/bs";

const Pengunjung = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [tanggal, setTanggal] = useState("");

  const getData = async () => {
    const { data } = await supabase.from("pengunjung").select("*").order("id", { ascending: false });
    if (data) {
      setDatas(data);
      setDataEmpty(data.length === 0);
    } else {
      setDatas([]);
      setDataEmpty(true);
    }
  };

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("pengunjung").delete().eq("id", idToDelete);
    if (!error) {
      setDatas(datas.filter((item) => item.id !== idToDelete));
      if (datas.length === 1) setDataEmpty(true);
    }
    setShowAlert(false);
    setIdToDelete(null);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentId(item.id);
    setNama(item.nama);
    setKelas(item.kelas);
    setKeperluan(item.keperluan);
    setTanggal(item.tanggal_kunjungan);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setIsEdit(false);
    setCurrentId(null);
    setNama("");
    setKelas("");
    setKeperluan("");
    setTanggal("");
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nama,
      kelas,
      keperluan,
      tanggal_kunjungan: tanggal,
    };

    if (isEdit) {
      const { error } = await supabase.from("pengunjung").update(payload).eq("id", currentId).select();
      if (error) alert(error.message);
      else {
        setDatas(datas.map((item) => (item.id === currentId ? { ...item, ...payload } : item)));
        resetForm();
      }
    } else {
      const { data, error } = await supabase.from("pengunjung").insert([payload]).select();
      if (error) alert(error.message);
      else {
        setDatas([data[0], ...datas]);
        setDataEmpty(false);
        resetForm();
      }
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/");
    };
    getSession();
    getData();
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
                  <p className="text-pretty text-gray-700">
                    Apakah Anda yakin ingin menghapus data ini? Data yang sudah dihapus tidak dapat dikembalikan.
                  </p>
                </div>
                <footer className="mt-6 flex justify-end gap-2">
                  <button onClick={() => setShowAlert(false)} type="button" className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
                    Batal
                  </button>
                  <button onClick={handleDelete} type="button" className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
                    Hapus
                  </button>
                </footer>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-blue-500 sm:text-2xl">
                    {isEdit ? "Edit Data Pengunjung" : "Masukan Data Pengunjung"}
                  </h2>
                  <button onClick={resetForm} type="button" className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 justify-center items-center">
                  <div className="flex flex-col gap-2">
                    <label>Nama Pengunjung</label>
                    <input value={nama} onChange={(e) => setNama(e.target.value)} required className="p-2 w-90 border-2 rounded-md border-zinc-300 outline-none" placeholder="Nama Lengkap..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Kelas</label>
                    <input value={kelas} onChange={(e) => setKelas(e.target.value)} required className="p-2 w-90 border-2 rounded-md border-zinc-300 outline-none" placeholder="Kelas..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Keperluan</label>
                    <input value={keperluan} onChange={(e) => setKeperluan(e.target.value)} required className="p-2 w-90 border-2 rounded-md border-zinc-300 outline-none" placeholder="Keperluan..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-zinc-500">Tanggal Kunjungan</label>
                    <input value={tanggal} onChange={(e) => setTanggal(e.target.value)} required className="p-2 w-90 text-zinc-500 border-2 border-zinc-300 rounded-md outline-none" type="date" />
                  </div>
                  <button type="submit" className="p-2 bg-blue-500 font-medium text-white w-90 rounded-md hover:bg-blue-600 transition-all">
                    {isEdit ? "Update Data" : "Simpan Data"}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-xs text-zinc-600 w-fit p-2">dashboard{location.pathname}</span>
          </div>
          <div className="p-8 w-full shadow-md bg-white rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-blue-500">Data Pengunjung</span>
              <button onClick={() => { setIsEdit(false); setIsModalOpen(true); }} className="bg-blue-500 text-sm p-2 rounded-md text-white font-medium cursor-pointer hover:bg-blue-600 transition-all">Tambah Data</button>
            </div>
            <div className="p-5 max-h-[400px] overflow-y-auto mt-4">
              {dataEmpty && (
                <div className="flex p-5 justify-center gap-4 items-center flex-col">
                  <BsDatabaseExclamation fontSize={45} className="text-zinc-500" />
                  <span className="text-zinc-500">Belum ada data pengunjung!</span>
                </div>
              )}
              {datas?.map((item) => (
                <div key={item.id} className="p-5 mt-5 flex justify-between items-center border border-zinc-200 bg-white rounded-lg shadow-sm">
                  <div className="flex gap-4 items-center">
                    <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold">
                      {item.nama?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-zinc-800 font-bold text-sm">{item.nama}</h1>
                      <span className="text-xs text-zinc-500">Kelas: {item.kelas}</span>
                      <span className="text-xs text-zinc-500">Keperluan: {item.keperluan}</span>
                      <span className="text-xs font-medium text-zinc-400 italic">{item.tanggal_kunjungan}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="font-medium text-sm p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-all">Edit</button>
                    <button onClick={() => confirmDelete(item.id)} className="font-medium text-sm p-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition-all">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengunjung;