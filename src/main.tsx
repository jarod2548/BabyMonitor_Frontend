
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './pages/Home/App.tsx'
import { WebSocketProvider } from './WebSocketService.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
     <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </BrowserRouter>
)
