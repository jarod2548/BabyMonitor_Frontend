
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './pages/Home/App.tsx'
import { AuthProvider } from './authorization/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
  </BrowserRouter>
  </AuthProvider>
  
)
