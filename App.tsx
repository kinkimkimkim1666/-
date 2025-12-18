import React, { useState, Component, ErrorInfo } from 'react';
import Header from './components/Header';
import WinnerList from './components/WinnerList';
import AdminPanel from './components/AdminPanel';
import { DailyWinners, INITIAL_WINNERS, AppView } from './types';
import { Settings, AlertTriangle } from 'lucide-react';

const STORAGE_KEY = 'cny_lucky_draw_data_v1';

// Simple Error Boundary to catch React crashes
class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cny-red p-4">
          <div className="bg-white text-red-800 p-6 rounded-lg shadow-xl max-w-md text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <h2 className="text-xl font-bold mb-2">發生錯誤</h2>
            <p className="mb-4">網頁載入時發生預期外的錯誤。</p>
            <div className="bg-gray-100 p-2 rounded text-xs text-left overflow-auto max-h-32 mb-4 font-mono">
                {this.state.error?.toString()}
            </div>
            <button 
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                重置資料並重新整理
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [view, setView] = useState<AppView>(AppView.PUBLIC);

  // Load data from LocalStorage on initialization, fallback to INITIAL_WINNERS
  const [winnersData, setWinnersData] = useState<DailyWinners>(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error("Failed to load saved data", e);
    }
    return INITIAL_WINNERS;
  });

  const days = [1, 2, 3, 4, 5];

  const handleUpdateWinners = (newData: DailyWinners) => {
    // Merge new data with existing structure
    const updatedData = {
        ...winnersData,
        ...newData
    };
    
    setWinnersData(updatedData);
    
    // Save to LocalStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {
      console.error("Failed to save data", e);
      alert("注意：由於瀏覽器限制，資料可能無法儲存。");
    }
  };

  return (
    <div className="min-h-screen bg-cny-red bg-opacity-95 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] pb-12 relative">
      <Header />

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-cny-red/95 backdrop-blur-md border-b border-cny-gold/30 shadow-md">
        <div className="max-w-4xl mx-auto px-2 overflow-x-auto">
            <div className="flex justify-between md:justify-center items-center py-4 gap-2 md:gap-4 min-w-max">
            {days.map((day) => (
                <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`
                    px-6 py-2 rounded-full font-bold text-sm md:text-base transition-all duration-300 transform
                    ${currentDay === day 
                        ? 'bg-cny-gold text-cny-red shadow-[0_0_15px_rgba(244,180,0,0.5)] scale-105 ring-2 ring-white/20' 
                        : 'bg-black/20 text-cny-yellow hover:bg-black/40 border border-transparent hover:border-cny-gold/30'
                    }
                `}
                >
                Day {day}
                </button>
            ))}
            </div>
        </div>
      </div>

      <main className="mt-8">
        <WinnerList day={currentDay} winners={winnersData[currentDay] || []} />
      </main>

      {/* Footer / Admin Toggle */}
      <footer className="mt-16 text-center text-cny-yellow/60 pb-8">
        <p className="text-sm mb-4">© {new Date().getFullYear()} 新春大抽獎活動</p>
        <button 
            onClick={() => setView(AppView.ADMIN)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/20 hover:bg-black/40 border border-white/10 transition-colors text-xs font-medium text-white/70"
        >
            <Settings className="w-3 h-3" />
            管理員登入
        </button>
      </footer>

      {/* Admin Modal */}
      {view === AppView.ADMIN && (
        <AdminPanel 
            onClose={() => setView(AppView.PUBLIC)} 
            onUpdateWinners={handleUpdateWinners}
            currentData={winnersData}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <AppContent />
        </ErrorBoundary>
    );
}

export default App;