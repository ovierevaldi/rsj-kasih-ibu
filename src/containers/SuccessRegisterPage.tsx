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
      <div className="text-center">
        <div>Pendaftaran Sukses</div>

        <div className="grid grid-cols-2 gap-4">
          {/* <div>No Pendaftaran:</div>
          <div>No Pendaftaran</div> */}

          <div>Nama Pasien</div>
          <div>{pendaftaranDetails.nama_pasien}</div>

          <div>Pengobatan:</div>
          <div>{pendaftaranDetails.nama_pengobatan}</div>

          <div>Jadwal Pengobatan:</div>
          <div>{pendaftaranDetails.nama_dokter}, {formatDateToJadwal(new Date(pendaftaranDetails.jadwal_pengobatan))}</div>

          <div>Pembayaran:</div>
          <div>{pendaftaranDetails.metode_pembayaran}</div>
        </div>

        <div className="flex gap-x-4">
          <button className="bg-[#125DFF] text-white rounded p-2">Print / Cetak</button>
          <button className="bg-[#125DFF] text-white rounded p-2">Save PDF</button>
        </div>

        <div>
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