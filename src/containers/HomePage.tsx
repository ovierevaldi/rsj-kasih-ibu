import { useNavigate } from "react-router-dom"

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
        <div className="text-5xl text-center mb-4">Welcome To</div>
        <div className="text-5xl text-center">RSJ Kasih Ibu</div>
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