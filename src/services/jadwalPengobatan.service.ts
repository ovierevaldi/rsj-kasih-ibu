import axios from "axios";
import type { JadwalPengobatanProp } from "../types/JadwalPengobatan.types";

export default class JadwalPengobatanService {
  static async getListJadwalPengobatan(dateString: string, jenis_pengobatan?: number | undefined): Promise<JadwalPengobatanProp[]>{
    try {
      const listJadwalPengobatan = await axios.get(`${import.meta.env.VITE_API_ADDRESS}/jadwal-pengobatan/by-date?date=${dateString}&jenis_pengobatan=${jenis_pengobatan}`);

      return listJadwalPengobatan.data as JadwalPengobatanProp[];
    } catch (error) {
      throw new Error(`Error fetching list of Jadwal Pengobatan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}