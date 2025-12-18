import React, { useState } from 'react';
import { parseExcelFile } from '../services/excelService';
import { DailyWinners } from '../types';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Lock, Info, Download, Save } from 'lucide-react';

interface AdminPanelProps {
  onUpdateWinners: (data: DailyWinners) => void;
  onClose: () => void;
  currentData?: DailyWinners; // Pass current data for backup
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onUpdateWinners, onClose, currentData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // Simple hardcoded password
  const ADMIN_PASSWORD = '8888';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setError(null);
    } else {
        setError('密碼錯誤');
    }
  };

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

  const handleDownloadBackup = () => {
    if (!currentData) return;
    const dataStr = JSON.stringify(currentData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cny_winners_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white text-gray-900 rounded-2xl w-full max-w-sm p-8 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
                
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-cny-red/10 text-cny-red rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">管理員驗證</h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input 
                            type="password" 
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="請輸入管理密碼 (8888)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cny-red focus:border-transparent outline-none"
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-cny-red text-white py-2 rounded-lg font-bold hover:bg-red-800 transition-colors">
                        登入
                    </button>
                </form>
            </div>
        </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-900 rounded-2xl w-full max-w-lg p-8 shadow-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
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
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 flex gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">關於資料儲存：</p>
                  <p>資料會自動儲存在<span className="font-bold">此瀏覽器</span>。</p>
                  <p className="mt-1">若要換電腦使用，請點擊下方「備份資料」按鈕。</p>
                </div>
            </div>

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
                        <p className="text-xs text-gray-500 mt-1">資料已自動儲存</p>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium">點擊或拖放 Excel 檔案</p>
                        <p className="text-xs mt-1">支援 .xlsx, .xls</p>
                    </div>
                )}
            </div>

            <button 
                onClick={handleDownloadBackup}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
                <Download className="w-4 h-4" />
                備份資料 (下載 JSON)
            </button>

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