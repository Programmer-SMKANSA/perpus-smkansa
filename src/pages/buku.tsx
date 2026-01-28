import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { BsDatabaseExclamation } from "react-icons/bs";

const Buku = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [dataBukuEmpty, setDataBukuEmpty] = useState(false)
  const [datas, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const [judul, setJudul] = useState("")
  const [cover, setCover] = useState("")
  const [penulis, setPenulis] = useState("")
  const [tahun, setTahun] = useState("")

  const handleDelete = async (id) => {
    const { data } = await supabase.from("buku").delete().eq('id', id).select()
    if (data) window.location.reload()
  }

  const handleEditClick = (item) => {
    setIsEdit(true)
    setSelectedId(item.id)
    setJudul(item.judul_buku)
    setPenulis(item.penulis)
    setCover(item.cover_url)
    setTahun(item.tahun_buku)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsEdit(false)
    setJudul("")
    setPenulis("")
    setCover("")
    setTahun("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      judul_buku: judul,
      cover_url: cover,
      penulis: penulis,
      tahun_buku: tahun
    }

    let error;
    if (isEdit) {
      const { error: editError } = await supabase.from("buku").update(payload).eq('id', selectedId)
      error = editError
    } else {
      const { error: postError } = await supabase.from("buku").insert([payload])
      error = postError
    }

    if (error) {
      alert(error.message)
    } else {
      handleCloseModal()
      window.location.reload()
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("buku").select()
      setData(data || [])
      setDataBukuEmpty(data?.length === 0)
    }

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session === null) navigate("/")
    }

    getData()
    getSession()
  }, [navigate])

  return (
    <div className="flex bg-zinc-50 min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Navbar />
        <div className="p-5">
          {isModalOpen && (
            <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-blue-500 sm:text-2xl">
                    {isEdit ? "Edit Data Buku" : "Masukan Data Buku"}
                  </h2>
                  <button onClick={handleCloseModal} type="button" className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 justify-center items-center">
                  <div className="flex flex-col gap-2">
                    <label>Judul Buku</label>
                    <input value={judul} onChange={(e) => setJudul(e.target.value)} required className="p-2 w-90 border-2 rounded-md border-zinc-300 outline-none" placeholder="Judul Buku..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Penulis</label>
                    <input value={penulis} onChange={(e) => setPenulis(e.target.value)} required className="p-2 w-90 border-2 rounded-md border-zinc-300 outline-none" placeholder="Nama Penulis..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Cover Buku (URL)</label>
                    <input value={cover} onChange={(e) => setCover(e.target.value)} required className="p-2 w-90 border-2 rounded-md border-zinc-300 outline-none" placeholder="Url Cover..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-zinc-500">Tahun Rilis</label>
                    <input value={tahun} onChange={(e) => setTahun(e.target.value)} required className="p-2 w-90 text-zinc-500 border-2 border-zinc-300 rounded-md outline-none" type="number" placeholder="2024" />
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
              <span className="font-semibold text-lg text-blue-500">Data Buku</span>
              <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-sm p-2 rounded-md text-white font-medium cursor-pointer hover:bg-blue-600 transition-all">Tambah Data</button>
            </div>
            <div className="p-5 max-h-[400px] overflow-y-auto mt-4">
              {dataBukuEmpty && (
                <div className="flex p-5 justify-center gap-4 items-center flex-col">
                  <BsDatabaseExclamation fontSize={45} className="text-zinc-500" />
                  <span className="text-zinc-500">Belum ada data yang dimasukan!</span>
                </div>
              )}
              {datas.map((item) => (
                <div key={item.id} className="p-5 mt-5 flex justify-between items-center border border-zinc-200 bg-white rounded-lg shadow-sm">
                  <div className="flex gap-4 items-center">
                    <img className="h-20 w-14 object-cover border border-zinc-200 rounded-md" src={item.cover_url} alt={item.judul_buku} />
                    <div className="flex flex-col">
                      <h1 className="text-zinc-800 font-bold text-sm">{item.judul_buku}</h1>
                      <span className="text-xs text-zinc-500">Penulis : {item.penulis}</span>
                      <span className="text-xs text-zinc-500">Tahun Rilis : {item.tahun_buku}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(item)} className="font-medium text-sm p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-all">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="font-medium text-sm p-2 bg-red-500 rounded-md text-white hover:bg-red-600 transition-all">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buku;