import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import JenisPengobatanService from "../services/jenisPengobatan.service";
import type { JenisPengobatanProp } from "../types/JenisPengobatan.types";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/success')
  };

  const [jenisPengobatan, setJenisPengobatan] = useState<JenisPengobatanProp[]>([]);

  //#region API Calls
  const fetchJenisPengobatan = async () => {
    try {
      const data = await JenisPengobatanService.getListJenisPengobatan();
      setJenisPengobatan(data);

    } catch (error) {
      console.error("Error fetching dokter list:", error);
    }
  }

  useEffect(() => {
    fetchJenisPengobatan();
  }, [])
 
  //#endregion

  return (
    <>
     <div className='flex items-center'>
        <div>Pendaftaran Pasien RSJ Kasih Ibu</div>
        <img src='https://placehold.co/100x100' alt='Logo RS'/>
      </div>
    {
      JSON.stringify(jenisPengobatan)
    }
      <form action="" className='grid grid-cols-2'>
          <div>Nama Pasien</div>
          <input type="text" className='border' />

          <div>Tanggal Lahir</div>
          <input type="date" className='border' />

     
          <div>Jenis Kelamin</div>
          <select name="" id="" className='border'>
            <option value="">Laki-Laki</option>
          </select>

          <div>Alamat</div>
          <input type="text" className='border'/>

          <div>Peserta BPJS?</div>
          <div className='flex'>
            <div>
              <input type="radio" name='peserta_bpjs' value={'ya'}/>
              Ya
            </div>
            <div>
              <input type="radio" name='peserta_bpjs' value={'asuransi_lain'}/>
              Asuransi Lain
            </div>
            <div>
              <input type="radio" name='peserta_bpjs' value={'tidak'}/>
              Tidak
            </div>
        </div>

        <div>Pilih Pengobatan</div>
          <select name="" id="" className='border'>
            {
              jenisPengobatan.map((jp: JenisPengobatanProp) => (
                <option value={jp.id}>{jp.nama_pengobatan}</option>
              ))
            }
        </select>

        <div>Pilih Jam Pengobatan</div>
          <select name="" id="" className='border'>
            <option value="">Dr. Brando, 17:00 23-Jan-2025</option>
        </select>

        <div>Metode Pembayaran</div>
          <select name="" id="" className='border'>
            <option value="">Cash / Ditempat</option>
        </select>

        <button 
          className='bg-[#125DFF] text-white roonded col-span-2 p-2'
          onClick={() => handleSubmit()}
        >
          Daftar
        </button>
     
      </form>
    </>
  )
}

export default RegistrationPage