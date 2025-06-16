import axios from "axios";
import type { JenisPengobatanProp } from "../types/JenisPengobatan.types";

export default class JenisPengobatanService {
  static async getListJenisPengobatan(): Promise<JenisPengobatanProp[]>{
    try {
      const listJenisPengobatan = await axios.get(`${import.meta.env.VITE_API_ADDRESS}/jenis-pengobatan`);

      return listJenisPengobatan.data as JenisPengobatanProp[];
    } catch (error) {
      throw new Error(`Error fetching list of Jenis Pengobatan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}