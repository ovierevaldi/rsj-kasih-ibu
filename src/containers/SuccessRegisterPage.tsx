const SuccessRegisterPage = () => {
  return (
    <div className="text-center">
      <div>Pendaftaran Sukses</div>

      <div className="grid grid-cols-2 gap-4">
        <div>No Pendaftaran:</div>
        <div>No Pendaftaran</div>

        <div>Nama Pasien</div>
        <div>No Pendaftaran</div>

        <div>Pengobatan:</div>
        <div>No Pendaftaran</div>

        <div>Jadwal Pengobatan:</div>
        <div>No Pendaftaran</div>

        <div>Pembayaran:</div>
        <div>No Pendaftaran</div>
      </div>

      <div className="flex gap-x-4">
        <button className="bg-[#125DFF] text-white rounded p-2">Print / Cetak</button>
        <button className="bg-[#125DFF] text-white rounded p-2">Save PDF</button>
      </div>

      <div>
        * Silakhan tanya kasir di tempat untuk info lebih lanjut
      </div>
      
    </div>
  )
}

export default SuccessRegisterPage