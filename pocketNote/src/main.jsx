import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GroupProvider } from './context/groupContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NoteProvider } from './context/noteContext.jsx'
import { ModalProvider } from './context/modalContext.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyleProvider } from './context/styleContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <GroupProvider>
        <NoteProvider>
          <ModalProvider>
            <StyleProvider>
              <App />
            </StyleProvider>
            <ToastContainer />
          </ModalProvider>
        </NoteProvider>
      </GroupProvider>
    </AuthProvider>
  </BrowserRouter>
)
