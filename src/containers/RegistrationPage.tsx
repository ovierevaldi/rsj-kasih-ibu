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
import { Controller, useForm } from "react-hook-form";
import type { PendaftaranInput } from "../types/Pendaftaran.types";
import PendaftaranService from "../services/pendaftaran.service";
import logoRs from  '../assets/logo_rs.jpg';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm<PendaftaranInput>({
    defaultValues: {
      nama_pasien: '',
      tanggal_lahir: '',
      tempat_lahir: '',
      jenis_kelamin: JENIS_KELAMIN.LAKI_LAKI,
      alamat: '',
      keluhan: '',
      jadwal_pengobatan_id: undefined,
      metode_pembayaran_id: undefined
    }
  });
 
  const handleFormSubmit = (data: PendaftaranInput) => {
    insertPendaftaranAPI(data)
    .then((pendaftaranId) => {
      if(pendaftaranId) {
        // If insert success, navigate to success page
        navigate(`/success/${pendaftaranId}`);
      } else {
        // Handle error case
        alert('Gagal mendaftar, silahkan coba lagi');
      }
    })
    .catch((error) => {
      console.error("Error inserting pendaftaran:", error);
      alert('Terjadi kesalahan saat mendaftar, silahkan coba lagi');
    });
    // navigate('/success')
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

      // Set default selected jenis pengobatan to the first one affer refetch
      setSelectedJenisPengobatan(data[0] || null);

    } catch (error) {
      console.error("Error fetching dokter list:", error);
    }
  };

  const fetchListMetodePembayaran = async () => {
    try {
      const data = await MetodePembayaranService.getListMetodePembayaran();
      setListMetodePembayaran(data);
      // Set default value for metode pembayaran after refetch
      if(data.length > 0) {
        setValue('metode_pembayaran_id', data[0].id);
      }

    } catch (error) {
      console.error("Error fetching dokter list:", error);
    }
  };

  const fetchJadwalPengobatanHariIni = async () => {
    try {
      const formatDate = formatDateToYMD(new Date());
      const data = await JadwalPengobatanService.getListJadwalPengobatan(formatDate, selectedJenisPengobatan?.id);
      setJadwalPengobatan(data);
      
      //set default value for jadwal_pengobatan_id after refetch
      if(data.length > 0) {
        setValue('jadwal_pengobatan_id', data[0].id);
      } 

    } catch (error) {
      
    }
  };

  const handleSelectedJenisPengobatan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value); 
    const selected = jenisPengobatan.find(jp => jp.id === selectedId) || null;
    setSelectedJenisPengobatan(selected);
  };

  const insertPendaftaranAPI = async (data: PendaftaranInput) => {
    try {
      const result = await PendaftaranService.insertPendaftaran(data);
      return result;
     
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchJenisPengobatan();
    fetchListMetodePembayaran();
  }, []);

  // Get jadwal pengobatan hari ini when selectedJenisPengobatan changes
  useEffect(() => {
    if(!selectedJenisPengobatan) return;
    fetchJadwalPengobatanHariIni();
  }, [selectedJenisPengobatan])
 
  //#endregion

  return (
    <div className="pt-4 pb-8">
     <div className='flex justify-center items-center gap-x-4'>
        <div className="text-3xl">Pendaftaran Pasien RSJ Kasih Ibu</div>
        <img src={logoRs} alt='Logo RS' className="w-14"/>
      </div>

      <br />
    
      <form 
        onSubmit={handleSubmit(handleFormSubmit)}
        className='grid grid-cols-[1fr_2fr] max-w-3xl mx-auto gap-6'
      >
          <div>Nama Pasien</div>
          <Controller 
            name="nama_pasien"
            render={({ field }) => (
              <input 
                {...field} 
                type="text" 
                className='border'
              />
            )}
            control={control}
          />
          

          <div>Tanggal Lahir</div>
          <Controller 
            name="tanggal_lahir"
            render={({ field }) => (
              <input 
                {...field} 
                type="date" 
                className='border h-10'
              />
            )}
            control={control}
          />

          <div>Tempat Lahir</div>
          <Controller 
            name="tempat_lahir"
            render={({ field }) => (
              <input {...field} type="text" className='border'/>
            )}
            control={control}
          />

     
          <div>Jenis Kelamin</div>
          <Controller 
            control={control}
            name="jenis_kelamin"
            defaultValue={JENIS_KELAMIN.LAKI_LAKI}
            render={({ field }) => (
                <div className='flex gap-x-2'>
                  <div className="flex items-center gap-x-2">
                    <input 
                      className="cursor-pointer h-5 w-5"
                      type="radio" 
                      value={JENIS_KELAMIN.LAKI_LAKI} 
                      name={field.name}
                      onChange={field.onChange}
                      checked={field.value === JENIS_KELAMIN.LAKI_LAKI}
                    />
                      Laki-Laki
                  </div>
                  <div className="flex items-center gap-x-2">
                    <input 
                      className="cursor-pointer h-5 w-5"
                      type="radio" 
                      value={JENIS_KELAMIN.PEREMPUAN} 
                      name={field.name}
                      onChange={field.onChange}
                      checked={field.value === JENIS_KELAMIN.PEREMPUAN}
                    />
                    Perempuan
                  </div>
                </div>
              )}
          />

          <div>Alamat</div>
          <Controller 
            control={control}
            name="alamat"
            render={({ field }) => (
              <textarea 
                {...field}
                className="border h-36" 
              />
            )}
          />

          <div>Keluhan</div>
          <Controller 
            name="keluhan"
            render={({ field }) => (
              <input {...field} type="text" className='border'/>
            )}
            control={control}
          />

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
                <option key={jp.id} value={jp.id}>{jp.nama_pengobatan}</option>
              ))
            }
          </select>

          <div>Pilih Jam Pengobatan</div>
          <Controller 
            control={control}
            name="jadwal_pengobatan_id"
            render={({ field }) => (
              <select 
                name="" 
                id="" 
                className='border'
                value={field.value}
                onChange={(e) => {
                  field.onChange(parseInt(e.target.value))
                }}
              >
                {
                  jadwalPengobatan.map((jp: JadwalPengobatanProp) => (
                    <option 
                      key={jp.id} 
                      value={jp.id}
                    >
                      {jp.nama_dokter} {formatDateToJadwal(new Date(jp.jadwal))}
                    </option>
                  ))
                }
              </select>
            )}
          />
       

          <div>Metode Pembayaran</div>
            <select name="" id="" className='border'>
              {
                listMetodePembayaran.map((pembayaran: MetodePembayaranProp) => (
                  <option key={pembayaran.id} value={pembayaran.id}>{pembayaran.nama}</option>
                ))
              }
          </select>

          <button 
            className='bg-[#125DFF] text-white rounded-lg col-span-2 p-2'
            type="submit"
          >
            Daftar
          </button>
      </form>
    </div>
  )
}

export default RegistrationPage