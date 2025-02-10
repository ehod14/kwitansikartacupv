import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ReceiptData } from '../types';

export const generatePDF = async (receiptElement: HTMLElement, receiptData: ReceiptData) => {
  try {
    // Create canvas from receipt element with better quality settings
    const canvas = await html2canvas(receiptElement, {
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      windowWidth: receiptElement.scrollWidth,
      windowHeight: receiptElement.scrollHeight,
      imageTimeout: 0
    });

    // Use A4 dimensions in mm
    const pageWidth = 210;
    const pageHeight = 297;

    // Calculate receipt dimensions to fit two receipts per page
    // Make the receipt width about 45% of the page width to allow for margins
    const receiptWidth = 90; // smaller width to fit two receipts
    const aspectRatio = canvas.height / canvas.width;
    const receiptHeight = receiptWidth * aspectRatio;

    // Create PDF with mm units
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate positions for two receipts
    const marginX = 15; // left/right margin
    const marginY = 15; // top margin
    const padding = 10; // padding between receipts

    // Add first receipt (left side)
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      marginX,
      marginY,
      receiptWidth,
      receiptHeight,
      undefined,
      'FAST'
    );

    // Add second receipt (right side)
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      marginX + receiptWidth + padding,
      marginY,
      receiptWidth,
      receiptHeight,
      undefined,
      'FAST'
    );

    // Save the PDF
    pdf.save(`receipt-${receiptData.receiptNumber}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
