import React, { useState } from 'react';
import { parseExcelFile } from '../services/excelService';
import { DailyWinners } from '../types';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminPanelProps {
  onUpdateWinners: (data: DailyWinners) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onUpdateWinners, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await parseExcelFile(file);
      onUpdateWinners(data);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("無法讀取 Excel 文件。請確保格式正確 (Day, Name, Phone)。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-900 rounded-2xl w-full max-w-lg p-8 shadow-2xl relative">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
            ✕
        </button>

        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-cny-red mb-2">管理員控制台</h2>
            <p className="text-gray-500 text-sm">批量更新得獎名單</p>
        </div>

        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                <p className="font-bold mb-1">Excel 格式說明：</p>
                <p>請上傳包含以下標題的 .xlsx 或 .xls 檔案：</p>
                <ul className="list-disc list-inside mt-2 text-blue-700">
                    <li>Day (例如: 1, 2, 3...)</li>
                    <li>Name (Facebook 名稱)</li>
                    <li>Phone (電話號碼)</li>
                </ul>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input 
                    type="file" 
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={loading}
                />
                
                {loading ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cny-red"></div>
                ) : success ? (
                    <div className="text-center text-green-600">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-bold">更新成功！</p>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium">點擊或拖放 Excel 檔案</p>
                        <p className="text-xs mt-1">支援 .xlsx, .xls</p>
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <button 
                onClick={onClose}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
                返回活動頁面
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;