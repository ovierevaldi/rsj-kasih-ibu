import axios from "axios";
import type { PendaftaranInput, PendaftaranProp } from "../types/Pendaftaran.types";

export default class PendaftaranService {
  static async insertPendaftaran(data: PendaftaranInput): Promise<number | null>{
    try {
      const result = await axios.post('http://localhost:3000/pendaftaran', {
        ...data
      });

      if(result.status === 201) {
        return result.data.data;
      }
      return null; 
    } catch (error) {
      throw new Error(`Error Inserting new Pendaftaran: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async getPendaftaranDetailById(id: number): Promise<any | null>{
    try {
      const result = await axios.get('http://localhost:3000/pendaftaran/' + id);
     
      if(result.status === 200) {
        return result.data;
      };

      return null; 
    } catch (error) {
      throw new Error(`Error Inserting new Pendaftaran: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}