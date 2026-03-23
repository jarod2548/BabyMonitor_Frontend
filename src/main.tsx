
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './pages/Home/App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
