import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RegistrationPage from './containers/RegistrationPage'
import SuccessRegisterPage from './containers/SuccessRegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegistrationPage />}/>
         <Route path='/success' element={<SuccessRegisterPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
