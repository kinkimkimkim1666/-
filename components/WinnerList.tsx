import React from 'react';
import { Winner } from '../types';
import { maskPhone } from '../services/excelService';

interface WinnerListProps {
  day: number;
  winners: Winner[];
}

const WinnerList: React.FC<WinnerListProps> = ({ day, winners }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
        
      {/* Static Festive Banner (Replacing AI Greeting) */}
      <div className="mb-8 p-6 bg-gradient-to-r from-cny-bright-red to-red-600 rounded-2xl border-2 border-cny-gold shadow-lg text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10">
             <p className="text-2xl font-serif font-bold text-white drop-shadow-md">
                🎉 恭喜所有得獎者！ 🎉
             </p>
             <p className="text-cny-yellow mt-2 font-medium">
                感謝大家參與，祝大家新一年好運連連、萬事勝意！
             </p>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="h-[2px] w-12 bg-cny-gold/50"></div>
        <h2 className="mx-4 text-3xl font-serif font-bold text-white">
           第 {day} 日得獎名單
        </h2>
        <div className="h-[2px] w-12 bg-cny-gold/50"></div>
      </div>

      {winners.length === 0 ? (
        <div className="text-center py-16 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
          <p className="text-xl text-gray-300">本日名單尚未公佈，敬請期待！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {winners.map((winner, idx) => (
            <div 
                key={`${winner.phone}-${idx}`}
                className="group relative bg-red-900/40 border border-cny-gold/30 rounded-lg p-4 hover:bg-red-900/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(244,180,0,0.3)]"
            >
              {/* Corner decor */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cny-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cny-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-cny-gold rounded-full flex items-center justify-center text-cny-red font-bold text-xl mb-3 shadow-inner">
                   {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 tracking-wide">{winner.name}</h3>
                <p className="text-cny-yellow font-mono text-lg">{maskPhone(winner.phone)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WinnerList;