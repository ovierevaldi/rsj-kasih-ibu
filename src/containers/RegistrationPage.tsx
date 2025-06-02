import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import JenisPengobatanService from "../services/jenisPengobatan.service";
import type { JenisPengobatanProp } from "../types/JenisPengobatan.types";
import type { MetodePembayaranProp } from "../types/MetodePembayaran.types";
import MetodePembayaranService from "../services/metodePembayaran.service";
import { JENIS_KELAMIN } from "../types/JenisKelamin.enum";
import JadwalPengobatanService from "../services/jadwalPengobatan.service";
import { formatDateToJadwal, formatDateToYMD } from "../helpers/dateFormat";
import type { JadwalPengobatanProp } from "../types/JadwalPengobatan.types";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/success')
  };

  const [jenisPengobatan, setJenisPengobatan] = useState<JenisPengobatanProp[]>([]);
  const [listMetodePembayaran, setListMetodePembayaran] = useState<MetodePembayaranProp[]>([]);
  const [jadwalPengobatan, setJadwalPengobatan] = useState<JadwalPengobatanProp[]>([]);

  const [selectedJenisPengobatan, setSelectedJenisPengobatan] = useState<JenisPengobatanProp | null>(null);

  //#region API Calls
  const fetchJenisPengobatan = async () => {
    try {
      const data = await JenisPengobatanService.getListJenisPengobatan();
      setJenisPengobatan(data);
      setSelectedJenisPengobatan(data[0] || null); // Set the first item as default if available

    } catch (error) {
      console.error("Error fetching dokter list:", error);
    }
  };

  const fetchListMetodePembayaran = async () => {
    try {
      const data = await MetodePembayaranService.getListMetodePembayaran();
      setListMetodePembayaran(data);

    } catch (error) {
      console.error("Error fetching dokter list:", error);
    }
  };

  const fetchJadwalPengobatanHariIni = async () => {
    try {
      const formatDate = formatDateToYMD(new Date());
      const data = await JadwalPengobatanService.getListJadwalPengobatan(formatDate, selectedJenisPengobatan?.id);
      setJadwalPengobatan(data)
    } catch (error) {
      
    }
  };

  const handleSelectedJenisPengobatan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value); 
    const selected = jenisPengobatan.find(jp => jp.id === selectedId) || null;
    setSelectedJenisPengobatan(selected);
  }

  useEffect(() => {
    fetchJenisPengobatan();
    fetchListMetodePembayaran();
    
  }, []);

  useEffect(() => {
    if(!selectedJenisPengobatan) return;
    fetchJadwalPengobatanHariIni();
  }, [selectedJenisPengobatan])
 
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
          <div className='flex gap-x-2'>
            <div>
              <input type="radio" value={JENIS_KELAMIN.LAKI_LAKI} name="jenis_kelamin"/>
                Laki-Laki
            </div>
            <div>
              <input type="radio" value={JENIS_KELAMIN.PEREMPUAN} name="jenis_kelamin"/>
              Perempuan
            </div>
          </div>

          <div>Alamat</div>
         <textarea className="border h-20"></textarea>

          {/* <div>Peserta BPJS?</div>
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
          </div> */}

        <div>Pilih Pengobatan</div>
          <select 
            name="jenis-pengobatan" 
            id="jenis-pengobatan" 
            className='border'
            onChange={handleSelectedJenisPengobatan}
          >
            {
              jenisPengobatan.map((jp: JenisPengobatanProp) => (
                <option value={jp.id}>{jp.nama_pengobatan}</option>
              ))
            }
          </select>

        <div>Pilih Jam Pengobatan</div>
          <select name="" id="" className='border'>
            {
              jadwalPengobatan.map((jp: JadwalPengobatanProp) => (
                <option value={jp.id}>{jp.nama_dokter} {formatDateToJadwal(new Date(jp.jadwal))}</option>
              ))
            }
        </select>

        <div>Metode Pembayaran</div>
          <select name="" id="" className='border'>
            {
              listMetodePembayaran.map((pembayaran: MetodePembayaranProp) => (
                <option value={pembayaran.id}>{pembayaran.nama}</option>
              ))
            }
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