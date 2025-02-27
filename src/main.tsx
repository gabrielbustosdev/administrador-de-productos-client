import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import Loader from './components/Loader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader>
      <RouterProvider router={router} />
    </Loader>
  </StrictMode>,
)
