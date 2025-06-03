import { useEffect, useState } from "react"
import type { JadwalPengobatanProp } from "../types/JadwalPengobatan.types"
import JadwalPengobatanService from "../services/jadwalPengobatan.service"
import { formatDateToYMD, getLocalTimeString } from "../helpers/dateFormat"
import JenisPengobatanService from "../services/jenisPengobatan.service"
import type { JenisPengobatanProp } from "../types/JenisPengobatan.types"

const JadwalPengobatan = () => {

  const [jadwalPengobatan, setJadwalPengobatan] = useState<JadwalPengobatanProp[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
  const [selectedJenisPengobatan, setSelectedJenisPengobatan] = useState<number | null>(null);

  const [listJenisPengobatan, setListJenisPengobatan] = useState<JenisPengobatanProp[]>([]);

  const handleChangeJenisPengobatan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value, 10);
    setSelectedJenisPengobatan(selectedId);
  }
  
  //#region API Calls
  const fetchJadwalPengobatanByDate = async () => {
    const formatDate = formatDateToYMD(selectedDate);

   if(!selectedJenisPengobatan){
    const data = await JadwalPengobatanService.getListJadwalPengobatan(formatDate);
    setJadwalPengobatan(data)
   }
   else{
    const data = await JadwalPengobatanService.getListJadwalPengobatan(formatDate, selectedJenisPengobatan);
    setJadwalPengobatan(data)
   }
  };

  const fetchJenisPengobatan = async () => {
    const data = await JenisPengobatanService.getListJenisPengobatan();
    setListJenisPengobatan(data as JenisPengobatanProp[]);
    setSelectedJenisPengobatan(data[0]?.id || null);
  };

  useEffect(() => {
    fetchJenisPengobatan();
  }, [])

  useEffect(() => {
    fetchJadwalPengobatanByDate();
  }, [selectedDate, selectedJenisPengobatan])

  //#endregion

  return (
    <div className="max-w-6xl mx-auto p-8">
       <div className="text-center text-3xl font-bold mb-12">Jadwal Pengobatan</div>
      <div className="flex justify-around text-2xl">
        <div className="flex items-center gap-8">
          <div>Pilih Pengobatan</div>
          <select 
            name="" 
            id="" 
            value={selectedJenisPengobatan || ""}
            className="border min-w-64"
            onChange={handleChangeJenisPengobatan}
          >
           {
            listJenisPengobatan.map((jp) => (
              <option value={jp.id}>{jp.nama_pengobatan}</option>
            ))
           }
          </select>
        </div>
        <div className="flex items-center gap-8">
          <div>Pilih Hari</div>
          <input 
            type="date"
            value={formatDateToYMD(selectedDate)}
            className="border min-w-64"
            onChange={(e) => {
              const d = new Date(e.target.value);
              setSelectedDate(d)
              // fetchJadwalPengobatanByDate(selectedDate)
              }
            
            }
          />
        </div>
      </div>
      <br />
      <br />
     
      <div className="text-2xl">
        <div className=" border rounded-xl p-8">
          {
            !jadwalPengobatan.length && <div className="text-center">Tidak ada data</div>
          }
          {
            jadwalPengobatan.length !== 0 && (
            <table className="w-full text-center">
              <thead className="border-b-2">
                <tr>
                  <th className="py-4">Jam</th>
                  <th className="py-4">Dokter</th>
                </tr>
              </thead>
              <tbody>
                {
                  jadwalPengobatan.map((jp) => (
                    <tr 
                      key={jp.id}
                      className="border-b hover:bg-gray-100 transition duration-200"
                    >
                      <td className="py-4">{getLocalTimeString(new Date(jp.jadwal))}</td>
                      <td className="py-4">{jp.nama_dokter}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default JadwalPengobatan