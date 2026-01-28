import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import Login from './auth/login.tsx'
import { RouterProvider } from 'react-router'

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Login
    },
  {
    path: "dashboard",
    Component: App
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={Router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
