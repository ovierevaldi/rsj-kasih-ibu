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
    <div>
      <div>Welcome To</div>
      <div>RSJ Kasih Ibu</div>

      <div className="flex gap-x-8">
        <button className="bg-[#125DFF] text-white p-4 rounded-lg" 
          onClick={() =>  goToRegistration()}
        >Pendaftaran</button>
        <button className="bg-[#125DFF] text-white p-4 rounded-lg"
            onClick={() =>  goToJadwalPengobatan()}
        >Jadwal Pengobatan</button>
      </div>
    </div>
  )
}

export default HomePage