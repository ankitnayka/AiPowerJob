import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/toaster"
import { Provider } from 'react-redux'
import store, { persistor } from '../src/app/store.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loadin={null} persistor={persistor}>
      <App />
      </PersistGate>
    <ToastContainer />
    </Provider>
  </StrictMode>
)
