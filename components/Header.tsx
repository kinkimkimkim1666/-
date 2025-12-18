import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative py-8 text-center overflow-hidden">
      {/* Decorative Lanterns (Simulated with CSS/Shapes) */}
      <div className="absolute top-0 left-4 w-16 h-24 bg-cny-bright-red rounded-b-3xl border-2 border-cny-gold shadow-[0_0_20px_rgba(244,180,0,0.6)] flex items-center justify-center animate-bounce duration-[3000ms]">
        <div className="text-cny-gold font-serif font-bold text-2xl writing-vertical">福</div>
      </div>
      <div className="absolute top-0 right-4 w-16 h-24 bg-cny-bright-red rounded-b-3xl border-2 border-cny-gold shadow-[0_0_20px_rgba(244,180,0,0.6)] flex items-center justify-center animate-bounce duration-[3500ms]">
        <div className="text-cny-gold font-serif font-bold text-2xl writing-vertical">春</div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-cny-gold text-lg font-bold tracking-[0.3em] mb-2 drop-shadow-md">
          祥龍獻瑞 · 迎春接福
        </h2>
        
        {/* Main Title with Requested Hearts */}
        <div className="flex items-center justify-center gap-4 mb-4">
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-500 fill-pink-500 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-cny-yellow to-cny-gold drop-shadow-sm">
            新春大抽獎
            </h1>
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-500 fill-pink-500 animate-pulse" />
        </div>

        <div className="inline-block px-6 py-1 border border-cny-gold/50 rounded-full bg-black/20 backdrop-blur-sm">
          <p className="text-cny-yellow/90 text-sm md:text-base flex items-center gap-2">
            <span>❤️</span> 每日公佈得獎名單 · 連續五天狂歡 <span>❤️</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;