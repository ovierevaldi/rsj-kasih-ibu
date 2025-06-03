import { useNavigate } from "react-router-dom";
import logoRs from  '../assets/logo_rs.jpg'

const HomePage = () => {
  const navigate = useNavigate();

  const goToRegistration = () => {
    navigate('/register');
  };

  const goToJadwalPengobatan = () => {
    navigate('jadwal');
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-8" >
      <div className="mb-2">
        <img src={logoRs} alt="" className="w-64 mb-8 mx-auto"/>
        <div className="text-4xl text-center mb-4">Welcome To RSJ Kasih Ibu</div>
      </div>

      <div className="flex gap-x-12 text-2xl">
        <button 
          className="bg-[#125DFF] text-white p-4 rounded-lg min-w-56 hover:bg-[#0f4dbb] transition-colors duration-300 cursor-pointer" 
          onClick={() =>  goToRegistration()}
          >
            Pendaftaran
        </button>
        <button 
          className="bg-[#125DFF] text-white p-4 rounded-lg min-w-56 hover:bg-[#0f4dbb] transition-colors duration-300 cursor-pointer"
          onClick={() =>  goToJadwalPengobatan()}
        >
          Jadwal Pengobatan
        </button>
      </div>
    </div>
  )
}

export default HomePage