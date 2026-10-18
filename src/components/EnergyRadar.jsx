import React from 'react';
import { Activity, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function EnergyRadar({ hp, setHp, mp, setMp, bossMode, setBossMode }) {
  const isLowEnergy = hp < 30 || mp < 30;
  return (
    <section
      className={`rounded-2xl p-5 bg-zinc-900/90 border-2 transition-all duration-300 ${
        isLowEnergy
          ? 'animate-pulse border-red-500 shadow-[0_0_28px_rgba(239,68,68,0.5)]'
          : 'border-zinc-800'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-black text-zinc-100">雙軌算力雷達 (Energy & Bandwidth)</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#121212] border border-zinc-800">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>實體肉體 (HP)</span>
            <span className={hp < 30 ? 'text-red-400' : 'text-emerald-400'}>{hp}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={hp}
            onChange={(e) => setHp(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#121212] border border-zinc-800">
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>情緒算力 (MP)</span>
            <span className={mp < 30 ? 'text-red-400' : 'text-cyan-400'}>{mp}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={mp}
            onChange={(e) => setMp(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {isLowEnergy ? (
        <div className="mt-4 p-4 rounded-xl bg-red-950/80 border-2 border-red-500 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5 text-red-100 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <span>「算力見底，今日建議開啟大爺模式，謝絕高耗能社交與勞動。」</span>
          </div>
          <button
            type="button"
            onClick={() => setBossMode(true)}
            className="px-3 py-1.5 rounded-lg bg-red-500 text-zinc-950 font-black text-xs shrink-0"
          >
            開啟大爺模式
          </button>
        </div>
      ) : (
        <div className="mt-4 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>算力水位穩定</span>
        </div>
      )}
    </section>
  );
}
