export const JENIS_KELAMIN =  {
  LAKI_LAKI :'L',
  PEREMPUAN : 'P',
} as const;

export type JenisKelamin = typeof JENIS_KELAMIN[keyof typeof JENIS_KELAMIN]

