import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PendaftaranService from "../services/pendaftaran.service";
import type { PendaftaranDetailProp } from "../types/Pendaftaran.types";
import { formatDateToJadwal } from "../helpers/dateFormat";

const SuccessRegisterPage = () => {
  const { id } = useParams<{ id: string }>();

  const [pendaftaranDetails, setPendaftaranDetails] = useState<PendaftaranDetailProp | null>(null);

  //#region API Calls
  const fetchPendaftaranDetails = async (pendaftaranId: string) => {
    const result = await PendaftaranService.getPendaftaranDetailById(Number(pendaftaranId));
    console.log(result)
    if (result) {
      setPendaftaranDetails({
        nama_pasien: result.nama_pasien,
        nama_pengobatan: result.jadwal_pengobatan.dokter.jenis_pengobatan.nama_pengobatan,
        jadwal_pengobatan: result.jadwal_pengobatan.jadwal,
        metode_pembayaran: result.metode_pembayaran.nama,
        nama_dokter: result.jadwal_pengobatan.dokter.nama
      });
    } else {
      // Handle case where no data is returned
      console.error("No pendaftaran details found for ID:", pendaftaranId);
    }
  }

  useEffect(() => {
    if(id){
      fetchPendaftaranDetails(id);
    }
  }, [id])
  //#endregion

  return (
    <>
      {pendaftaranDetails ? 
      <div className="flex flex-col h-screen items-center justify-center gap-y-12 text-2xl">
        <div className="text-4xl font-bold">Pendaftaran Sukses</div>

        <div className="grid grid-cols-2 gap-8">
          <div>No Pendaftaran:</div>
          <div className="font-semibold">No Pendaftaran</div>

          <div>Nama Pasien:</div>
          <div className="font-semibold">{pendaftaranDetails.nama_pasien}</div>

          <div>Pengobatan:</div>
          <div className="font-semibold">{pendaftaranDetails.nama_pengobatan}</div>

          <div>Jadwal Pengobatan:</div>
          <div className="font-semibold">{pendaftaranDetails.nama_dokter}, {formatDateToJadwal(new Date(pendaftaranDetails.jadwal_pengobatan))}</div>

          <div>Pembayaran:</div>
          <div className="font-semibold">{pendaftaranDetails.metode_pembayaran}</div>

          <button 
            className="bg-[#125DFF] text-white rounded hover:bg-[#0f4dbb] transition-colors duration-300 cursor-pointer py-2 disabled:bg-[#123eff75]"
            disabled
          >
            Print / Cetak
          </button>
          <button 
            disabled
            className="bg-[#125DFF] text-white rounded hover:bg-[#0f4dbb] transition-colors duration-300 cursor-pointer py-2 disabled:bg-[#123eff75]">
            Save PDF
          </button>
        </div>

        <div className="absolute right-0 bottom-0 text-base p-4">
          * Silakhan tanya kasir di tempat untuk info lebih lanjut
        </div>
        
      </div>
      :
      <>No Data</>
      }
    </>
  )
}

export default SuccessRegisterPage