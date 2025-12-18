import React, { useState } from 'react';
import Header from './components/Header';
import WinnerList from './components/WinnerList';
import AdminPanel from './components/AdminPanel';
import { DailyWinners, INITIAL_WINNERS, AppView } from './types';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [winnersData, setWinnersData] = useState<DailyWinners>(INITIAL_WINNERS);
  const [view, setView] = useState<AppView>(AppView.PUBLIC);

  const days = [1, 2, 3, 4, 5];

  const handleUpdateWinners = (newData: DailyWinners) => {
    // Merge new data with existing structure to ensure all days exist
    setWinnersData(prev => ({
        ...prev,
        ...newData
    }));
  };

  return (
    <div className="min-h-screen bg-cny-red bg-opacity-95 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] pb-12">
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
      <footer className="mt-16 text-center text-white/40 pb-8">
        <p className="text-sm mb-4">© {new Date().getFullYear()} 新春大抽獎活動</p>
        <button 
            onClick={() => setView(AppView.ADMIN)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs"
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
        />
      )}
    </div>
  );
};

export default App;