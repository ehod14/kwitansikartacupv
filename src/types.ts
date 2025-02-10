export interface ReceiptData {
  receiptNumber: string;
  date: string;
  time: string;
  customerName: string;
  clubName: string;
  amount: number;
  paymentPurpose: string;
  paymentMethod: string;
  imageUrl?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}
