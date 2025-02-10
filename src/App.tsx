import { useState, useEffect } from 'react'
import { Printer, Download } from 'lucide-react'
import { Toaster, toast } from 'react-hot-toast'
import './index.css'
import ReceiptForm from './components/ReceiptForm'
import Receipt from './components/Receipt'
import { ReceiptData } from './types'
import { database } from './firebase'
import { ref, push, onValue } from 'firebase/database'
import { generatePDF } from './utils/pdfGenerator'

function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [allReceipts, setAllReceipts] = useState<ReceiptData[]>([]);

  useEffect(() => {
    // Set up real-time listener for receipts
    const receiptsRef = ref(database, 'receipts');
    const unsubscribe = onValue(receiptsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const receiptsArray = Object.values(data) as ReceiptData[];
        setAllReceipts(receiptsArray);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (data: ReceiptData) => {
    try {
      setReceiptData(data);
      // Save to Firebase
      const receiptsRef = ref(database, 'receipts');
      await push(receiptsRef, data);
      toast.success('Transaksi berhasil disimpan!', {
        duration: 3000,
        position: 'top-center',
      });
    } catch (error) {
      toast.error('Gagal menyimpan transaksi. Silakan coba lagi.', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const handlePrint = (receipt: ReceiptData) => {
    setReceiptData(receipt);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleDownloadPDF = async (receipt: ReceiptData) => {
    setReceiptData(receipt);
    setTimeout(async () => {
      const receiptElement = document.querySelector('.receipt-paper');
      if (receiptElement) {
        await generatePDF(receiptElement as HTMLElement, receipt);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen receipt-container">
      <Toaster />
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">KARTA CUP V</h1>
          <p className="text-[#FFD700] text-sm">Sistem Kwitansi Digital</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="no-print bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto w-full">
            <h2 className="text-xl font-bold text-[#0D6D2C] mb-4">Buat Kwitansi Baru</h2>
            <ReceiptForm onSubmit={handleSubmit} />
          </div>

          <div className="max-w-md mx-auto w-full">
            {receiptData && (
              <div className="space-y-3">
                <Receipt data={receiptData} />
                <button
                  onClick={() => handlePrint(receiptData)}
                  className="no-print w-full bg-[#FFD700] text-[#0D6D2C] py-2 px-4 rounded-md hover:bg-[#FFC107] transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Cetak Kwitansi
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 no-print max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-3">Riwayat Kwitansi</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">No. Kwitansi</th>
                    <th className="px-4 py-2">Tanggal</th>
                    <th className="px-4 py-2">Jam</th>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">Club</th>
                    <th className="px-4 py-2">Jumlah</th>
                    <th className="px-4 py-2">Tujuan</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {allReceipts.map((receipt, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2">{receipt.receiptNumber}</td>
                      <td className="px-4 py-2">{new Date(receipt.date).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-2">{receipt.time}</td>
                      <td className="px-4 py-2">{receipt.customerName}</td>
                      <td className="px-4 py-2">{receipt.clubName}</td>
                      <td className="px-4 py-2">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(receipt.amount)}
                      </td>
                      <td className="px-4 py-2">{receipt.paymentPurpose}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePrint(receipt)}
                            className="p-1 text-gray-600 hover:text-[#0D6D2C] transition-colors"
                            title="Cetak"
                          >
                            <Printer size={16} />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(receipt)}
                            className="p-1 text-gray-600 hover:text-[#0D6D2C] transition-colors"
                            title="Unduh PDF"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
