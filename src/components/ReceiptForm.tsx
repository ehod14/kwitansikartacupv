import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ReceiptData } from '../types';

interface ReceiptFormProps {
  onSubmit: (data: ReceiptData) => void;
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ReceiptData>({
    receiptNumber: `KC${new Date().getTime().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    customerName: '',
    clubName: '',
    amount: 0,
    paymentPurpose: '',
    paymentMethod: 'cash',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full text-sm">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Nomor Kwitansi
        </label>
        <input
          type="text"
          name="receiptNumber"
          value={formData.receiptNumber}
          readOnly
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-gray-50 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Jam
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Nama Penyetor
        </label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Nama Club
        </label>
        <input
          type="text"
          name="clubName"
          value={formData.clubName}
          onChange={handleChange}
          required
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Jumlah (Rp)
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Tujuan Pembayaran
        </label>
        <input
          type="text"
          name="paymentPurpose"
          value={formData.paymentPurpose}
          onChange={handleChange}
          required
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Metode Pembayaran
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm"
        >
          <option value="cash">Tunai</option>
          <option value="transfer">Transfer Bank</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-[#0D6D2C] text-white py-1.5 px-3 rounded-md hover:bg-[#0A5622] transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <Save size={16} />
        Simpan Kwitansi
      </button>
    </form>
  );
};

export default ReceiptForm;
