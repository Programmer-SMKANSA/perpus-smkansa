import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import { BsDatabaseExclamation } from "react-icons/bs";

const Buku = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataBukuEmpty, setDataBukuEmpty] = useState(false);
  const [datas, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [judul, setJudul] = useState("");
  const [cover, setCover] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");

  const getData = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("buku").select();
      if (error) throw error;
      setData(data || []);
      setDataBukuEmpty(data?.length === 0);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("buku").delete().eq('id', selectedId);
    if (error) {
      alert(error.message);
    } else {
      setShowAlert(false);
      setSelectedId(null);
      getData();
    }
  };

  const handleEditClick = (item) => {
    setIsEdit(true);
    setSelectedId(item.id);
    setJudul(item.judul_buku);
    setPenulis(item.penulis);
    setCover(item.cover_url);
    setTahun(item.tahun_buku);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setJudul("");
    setPenulis("");
    setCover("");
    setTahun("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      judul_buku: judul,
      cover_url: cover,
      penulis: penulis,
      tahun_buku: tahun
    };

    let error;
    if (isEdit) {
      const { error: editError } = await supabase.from("buku").update(payload).eq('id', selectedId);
      error = editError;
    } else {
      const { error: postError } = await supabase.from("buku").insert([payload]);
      error = postError;
    }

    if (error) {
      alert(error.message);
    } else {
      handleCloseModal();
      getData();
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/");
      } else {
        getData();
      }
    };

    checkSession();
  }, [navigate, getData]);

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
                  <h2 className="text-xl font-bold text-blue-500 sm:text-2xl">
                    {isEdit ? "Edit Data Buku" : "Masukan Data Buku"}
                  </h2>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 w-90 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Judul Buku</label>
                    <input value={judul} onChange={(e) => setJudul(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" placeholder="Judul Buku..." />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Penulis</label>
                    <input value={penulis} onChange={(e) => setPenulis(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" placeholder="Nama Penulis..." />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Cover Buku (URL)</label>
                    <input value={cover} onChange={(e) => setCover(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" placeholder="https://..." />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Tahun Rilis</label>
                    <input value={tahun} onChange={(e) => setTahun(e.target.value)} required className="p-2 border-2 border-zinc-200 rounded-md outline-blue-500" type="number" />
                  </div>
                  <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all font-bold">
                    {isEdit ? "Update Data" : "Simpan Data"}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-col mb-4">
            <span className="text-xs text-zinc-500">Dashboard {location.pathname}</span>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-xl text-zinc-800">Koleksi Buku</span>
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all">
                + Tambah Buku
              </button>
            </div>

            <div className="space-y-4">
              {dataBukuEmpty ? (
                <div className="flex flex-col items-center py-10">
                  <BsDatabaseExclamation size={50} className="text-zinc-300 mb-2" />
                  <p className="text-zinc-500">Belum ada koleksi buku.</p>
                </div>
              ) : (
                datas.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all">
                    <div className="flex items-center gap-4">
                      <img className="h-20 w-14 object-cover rounded-md shadow-sm" src={item.cover_url} alt="cover" />
                      <div>
                        <h3 className="font-bold text-zinc-800">{item.judul_buku}</h3>
                        <p className="text-xs text-zinc-500">Penulis: {item.penulis}</p>
                        <p className="text-xs text-zinc-500">Tahun: {item.tahun_buku}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(item)} className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md font-bold">Edit</button>
                      <button onClick={() => confirmDelete(item.id)} className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-md font-bold">Hapus</button>
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

export default Buku;