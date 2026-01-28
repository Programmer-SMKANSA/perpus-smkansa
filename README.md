## 📚 Perpus-Smkansa

**Perpus-Smkansa** adalah aplikasi manajemen perpustakaan berbasis desktop (Neutralinojs) dan web yang dirancang untuk mendigitalisasi proses administrasi di perpustakaan SMKN 1 Sumbawa. 

Aplikasi ini memudahkan petugas dalam mengelola data buku dan mencatat pengunjung

### Fitur Utama
* **Manajemen Buku:** Input, edit, dan hapus koleksi buku dengan mudah.
* **Absensi Pengunjung:** Pencatatan otomatis siswa yang berkunjung ke perpustakaan.
* **Peminjaman Digital:** Pantau status peminjaman (dipinjam/kembali) secara transparan.
* **Database Cloud:** Menggunakan Supabase untuk sinkronisasi data yang aman dan cepat.
* **Desktop Ready:** Aplikasi ringan yang bisa dijalankan langsung di Windows atau Linux tanpa perlu browser manual.

### Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Neutralino.js](https://img.shields.io/badge/Neutralino.js-FFA500?style=for-the-badge&logo=neutralinojs&logoColor=white)
### Cara Menjalankan Project
1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/username/perpus-smkansa.git](https://github.com/username/perpus-smkansa.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build React App:**
    ```bash
    npm run build
    ```
4.  **Jalankan aplikasi (Mode Desktop):**
    ```bash
    neu run
    ```

### Setup Database
Untuk menduplikasi struktur database, salin kode SQL yang ada di bawah ini dan tempelkan pada **SQL Editor* di dashboard Supabase Anda.
```sql
CREATE TABLE public.buku (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  judul_buku text,
  penulis text,
  tahun_buku text,
  user_id uuid DEFAULT gen_random_uuid() UNIQUE,
  cover_url text,
  CONSTRAINT buku_pkey PRIMARY KEY (id)
);
CREATE TABLE public.peminjam (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  nama text,
  kelas text,
  judul_buku text,
  jadwal_pengembalian date,
  user_id uuid UNIQUE,
  status text DEFAULT ''::text,
  CONSTRAINT peminjam_pkey PRIMARY KEY (id)
);
CREATE TABLE public.pengunjung (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  nama text,
  keperluan text,
  tanggal_kunjungan date,
  user_id uuid DEFAULT gen_random_uuid() UNIQUE,
  kelas text,
  CONSTRAINT pengunjung_pkey PRIMARY KEY (id)
);
```
---
