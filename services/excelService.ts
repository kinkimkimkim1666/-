import * as XLSX from 'xlsx';
import { DailyWinners, Winner } from '../types';

export const parseExcelFile = (file: File): Promise<DailyWinners> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const newWinners: DailyWinners = {
            1: [], 2: [], 3: [], 4: [], 5: []
        };

        jsonData.forEach((row) => {
          // Flexible key matching (case insensitive)
          const keys = Object.keys(row);
          const dayKey = keys.find(k => k.toLowerCase().includes('day') || k.includes('日'));
          const nameKey = keys.find(k => k.toLowerCase().includes('name') || k.includes('名'));
          const phoneKey = keys.find(k => k.toLowerCase().includes('phone') || k.includes('電話'));

          if (dayKey && nameKey && phoneKey) {
             const day = parseInt(row[dayKey]);
             if (day >= 1 && day <= 5) {
                newWinners[day].push({
                    day: day,
                    name: row[nameKey],
                    phone: String(row[phoneKey]) // Ensure phone is string
                });
             }
          }
        });

        resolve(newWinners);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

export const maskPhone = (phone: string) => {
    if (!phone) return '****';
    if (phone.length < 4) return phone;
    return phone.substring(0, 4) + '****';
};