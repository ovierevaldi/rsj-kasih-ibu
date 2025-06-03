import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RegistrationPage from './containers/RegistrationPage'
import SuccessRegisterPage from './containers/SuccessRegisterPage'
import HomePage from './containers/HomePage'
import JadwalPengobatan from './containers/JadwalPengobatan'
import NavigationButton from './components/NavigationButton'

function App() {
  return (
    <BrowserRouter>
      <NavigationButton />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='jadwal' element={<JadwalPengobatan />}/>
        <Route path='/register' element={<RegistrationPage />}/>
        <Route path='/success/:id' element={<SuccessRegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
