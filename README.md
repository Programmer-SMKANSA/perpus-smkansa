## 📚 Perpus-Smkansa

**Perpus-Smkansa** adalah aplikasi manajemen perpustakaan berbasis desktop (Neutralinojs) dan web yang dirancang untuk memudahkan proses administrasi di perpustakaan SMKN 1 Sumbawa. 

Aplikasi ini memudahkan petugas dalam mengelola data buku dan mencatat pengunjung

### Preview
<table border="0">
  <tr>
    <td><img src="screenshot-2026-01-28_11-56-22.png" alt="Preview 1" width="100%"></td>
    <td><img src="screenshot-2026-01-28_11-56-43.png" alt="Preview 2" width="100%"></td>
  </tr>
  <tr>
    <td><img src="screenshot-2026-01-28_11-57-05.png" alt="Preview 3" width="100%"></td>
    <td><img src="screenshot-2026-01-28_11-56-22.png" alt="Preview 4" width="100%"></td>
  </tr>
</table>

### Demo
<a href="https://perpus-smkansa.vercel.app/">https://perpus-smkansa.vercel.app</a>

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
    git clone https://github.com/Programmer-SMKANSA/perpus-smkansa.git
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
<a href="https://github.com/Programmer-SMKANSA/perpus-smkansa/blob/main/skema_db.txt">Klik disini!</a>
<br/>
note : wajib buat akun admin untuk login ke dashboard, pergi ke db lalu bagian authentication add user lalu masukan email dan password
