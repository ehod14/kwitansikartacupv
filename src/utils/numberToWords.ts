const units = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
const teens = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
const tens = ['', '', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];

function convertLessThanOneThousand(number: number): string {
  if (number === 0) {
    return '';
  }

  if (number < 10) {
    return units[number];
  }

  if (number < 20) {
    return teens[number - 10];
  }

  if (number < 100) {
    return tens[Math.floor(number / 10)] + (number % 10 !== 0 ? ' ' + units[number % 10] : '');
  }

  if (number === 100) {
    return 'Seratus';
  }

  return (number < 200 ? 'Seratus' : units[Math.floor(number / 100)] + ' Ratus') + 
         (number % 100 !== 0 ? ' ' + convertLessThanOneThousand(number % 100) : '');
}

export function numberToWords(number: number): string {
  if (number === 0) {
    return 'Nol';
  }

  let words = '';
  const billions = Math.floor(number / 1000000000);
  const millions = Math.floor((number % 1000000000) / 1000000);
  const thousands = Math.floor((number % 1000000) / 1000);
  const remainder = number % 1000;

  if (billions > 0) {
    words += (billions === 1 ? 'Satu' : convertLessThanOneThousand(billions)) + ' Miliar ';
  }

  if (millions > 0) {
    words += (millions === 1 ? 'Satu' : convertLessThanOneThousand(millions)) + ' Juta ';
  }

  if (thousands > 0) {
    words += (thousands === 1 ? 'Satu' : convertLessThanOneThousand(thousands)) + ' Ribu ';
  }

  if (remainder > 0) {
    words += convertLessThanOneThousand(remainder);
  }

  return words.trim() + ' Rupiah';
}
