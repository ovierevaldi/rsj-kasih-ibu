import axios from "axios";
import type { JadwalPengobatanProp } from "../types/JadwalPengobatan.types";

export default class JadwalPengobatanService {
  static async getListJadwalPengobatan(dateString: string): Promise<JadwalPengobatanProp[]>{
    try {
      const listJadwalPengobatan = await axios.get(`http://localhost:3000/jadwal-pengobatan/by-date?date=${dateString}`);

      return listJadwalPengobatan.data as JadwalPengobatanProp[];
    } catch (error) {
      throw new Error(`Error fetching list of Jadwal Pengobatan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}