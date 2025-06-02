import axios from "axios";
import type { MetodePembayaranProp } from "../types/MetodePembayaran.types";

export default class MetodePembayaranService {
  static async getListMetodePembayaran(): Promise<MetodePembayaranProp[]>{
    try {
      const listMetodePembayaran = await axios.get('http://localhost:3000/metode-pembayaran');

      return listMetodePembayaran.data as MetodePembayaranProp[];
    } catch (error) {
      throw new Error(`Error fetching list of Metode Pembayaran: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}