
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './pages/Home/App.tsx'
import Layout from './layout.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>
)
