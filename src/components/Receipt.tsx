import React, { useRef } from 'react';
import { ReceiptData } from '../types';
import { numberToWords } from '../utils/numberToWords';
import { generatePDF } from '../utils/pdfGenerator';
import { Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ReceiptProps {
  data: ReceiptData;
}

const Receipt: React.FC<ReceiptProps> = ({ data }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      const success = await generatePDF(receiptRef.current, data);
      if (success) {
        alert('PDF berhasil dibuat!');
      } else {
        alert('Gagal membuat PDF. Silakan coba lagi.');
      }
    }
  };

  // Generate verification data for QR code
  const verificationData = JSON.stringify({
    receiptNumber: data.receiptNumber,
    date: data.date,
    time: data.time,
    amount: data.amount,
    verificationCode: btoa(`${data.receiptNumber}-${data.date}-${data.amount}`).substring(0, 8)
  });

  return (
    <div className="space-y-3">
      <div 
        ref={receiptRef} 
        className="receipt-paper p-4 rounded-lg mx-auto text-xs relative overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '100%',
          backgroundColor: 'white',
          margin: '0 auto'
        }}
      >
        {/* Security watermark pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] select-none" 
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, 
              #0D6D2C 0px, 
              #0D6D2C 10px, 
              transparent 10px, 
              transparent 50px
            )`,
            transform: 'rotate(-45deg)',
            transformOrigin: 'center center',
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%'
          }}
        >
        </div>

        <div className="relative">
          <div className="text-center mb-3">
            <h1 className="text-xl font-bold text-[#0D6D2C] mb-0.5">KARTA CUP V</h1>
            <div className="text-[10px] text-gray-600">
              <p>Turnamen Sepak Bola Desa Pangauban</p>
              <p>Tahun 2025</p>
            </div>
          </div>

          <div className="border-t-2 border-b-2 border-[#FFD700] py-2 my-2">
            <h2 className="text-lg font-bold text-center mb-2">KWITANSI</h2>
            
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">No. Kwitansi:</span>
                <span>{data.receiptNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Tanggal:</span>
                <span>{new Date(data.date).toLocaleDateString('id-ID')} {data.time}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Telah diterima dari:</span>
                <span>{data.customerName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Nama Club:</span>
                <span>{data.clubName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Jumlah:</span>
                <span className="font-bold text-[#0D6D2C]">{formatCurrency(data.amount)}</span>
              </div>

              <div className="border-t border-gray-200 pt-1.5">
                <span className="font-medium">Terbilang:</span>
                <p className="italic text-gray-600 text-[10px]">{numberToWords(data.amount)}</p>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Tujuan:</span>
                <span>{data.paymentPurpose}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Pembayaran via:</span>
                <span>{data.paymentMethod === 'cash' ? 'Tunai' : 'Transfer Bank'}</span>
              </div>
            </div>
          </div>

          {/* Footer section with centered content */}
          <div className="mt-3 flex flex-col items-center gap-2">
            {/* QR Code section */}
            <div className="text-center">
              <QRCodeSVG
                value={verificationData}
                size={60}
                level="H"
                includeMargin={true}
              />
              <p className="text-[10px] text-gray-500 mt-1">Kode Verifikasi</p>
              <p className="text-[10px] font-mono">{btoa(`${data.receiptNumber}-${data.date}-${data.amount}`).substring(0, 8)}</p>
            </div>
          </div>

          {/* Centered security text watermark */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          >
            <div 
              className="text-[10px] text-gray-300 transform -rotate-45"
            >
              KARTA CUP V - DOKUMEN ASLI
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleDownloadPDF}
          className="no-print w-full bg-[#0D6D2C] text-white py-2 px-4 rounded-md hover:bg-[#0A5622] transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Download size={16} />
          Unduh PDF
        </button>
      </div>
    </div>
  );
};

export default Receipt;
