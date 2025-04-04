import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import SingleNote from './pages/SingleNote'
import ProtectedRoute from './components/ProtectedRoute'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/notes/:id' element={<ProtectedRoute><SingleNote /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
