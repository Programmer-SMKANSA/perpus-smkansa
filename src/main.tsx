import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import Login from './auth/login.tsx'
import { RouterProvider } from 'react-router'
import Buku from './pages/buku.tsx'
import Peminjam from './pages/peminjam.tsx'
import Pengunjung from './pages/pengunjung.tsx'
import Laporan from './pages/laporan.tsx'
import Error from './error.tsx'

const Router = createBrowserRouter([
  {
    path: "*",
    Component: Error
  },
  {
    path: "/",
    Component: Login
  },
  {
    path: "dashboard",
    Component: App
    },
  {
    path: "buku",
    Component: Buku
  },
  {
    path: "peminjam",
    Component: Peminjam
  },
  {
    path: "pengunjung",
    Component: Pengunjung
  },
  {
    path: "laporan",
    Component: Laporan
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
