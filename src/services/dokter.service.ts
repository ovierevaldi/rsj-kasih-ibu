import axios from "axios";
import type { DokterProp } from "../types/Dokter.types";

export default class DokterService {
  static async getListDokter(): Promise<DokterProp[]>{
    try {
      const listDokter = await axios.get(`${import.meta.env.VITE_API_ADDRESS}/dokter`);

      return listDokter.data as DokterProp[];
    } catch (error) {
      throw new Error(`Error fetching list of doctors: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}