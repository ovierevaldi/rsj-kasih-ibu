import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RegistrationPage from './containers/RegistrationPage'
import SuccessRegisterPage from './containers/SuccessRegisterPage'
import HomePage from './containers/HomePage'
import JadwalPengobatan from './containers/JadwalPengobatan'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='jadwal' element={<JadwalPengobatan />}/>
         <Route path='/register' element={<RegistrationPage />}/>
         <Route path='/success' element={<SuccessRegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
