import { useEffect, useState } from "react"
import type { JadwalPengobatanProp } from "../types/JadwalPengobatan.types"
import JadwalPengobatanService from "../services/jadwalPengobatan.service"
import { formatDateToYMD, getLocalTimeString } from "../helpers/dateFormat"

const JadwalPengobatan = () => {

  const [jadwalPengobatan, setJadwalPengobatan] = useState<JadwalPengobatanProp[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); 
  
  //#region API Calls
  const fetchJadwalPengobatanByDate = async (selectedDate: Date) => {
    const formatDate = formatDateToYMD(selectedDate);

    const data = await JadwalPengobatanService.getListJadwalPengobatan(formatDate);

    setJadwalPengobatan(data)
  };

  useEffect(() => {
    fetchJadwalPengobatanByDate(selectedDate);
  }, [selectedDate])

  //#endregion

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>Pilih Pengobatan</div>
        <select name="" id="">
          <option value=""></option>
        </select>

        <div>Pilih Pengobatan</div>
        <input type="date"
          value={formatDateToYMD(selectedDate)}
          className="border border-gray-300 rounded px-2 py-1"
          onChange={(e) => {
            const d = new Date(e.target.value);
            setSelectedDate(d)
            // fetchJadwalPengobatanByDate(selectedDate)
            }
          }
        />
      </div>

      <div>
        {
          !jadwalPengobatan.length && <div>Tidak ada data</div>
        }
        {
          jadwalPengobatan.length !== 0 && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Jam</th>
                    <th>Dokter</th>
                  </tr>
                </thead>
                <tbody>
                   {
                    jadwalPengobatan.map((jp) => (
                      <tr key={jp.id}>
                        <td>{getLocalTimeString(new Date(jp.jadwal))}</td>
                        <td>{jp.nama_dokter}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
             
            </div>
          )
        }
      </div>
    </div>
  )
}

export default JadwalPengobatan