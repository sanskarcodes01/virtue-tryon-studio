import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'motion/react';
import { TrendingUp, Users, ShoppingCart, Activity, ArrowUpRight } from 'lucide-react';

const COLORS = ['#000000', '#222222', '#444444', '#666666'];

export function AdminPanel() {
  const [stats, setStats] = useState({
    totalTryOns: 1248,
    activeUsers: 842,
    conversionRate: 12.5,
  });

  const lineData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 600 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 900 },
    { name: 'Fri', value: 1200 },
    { name: 'Sat', value: 1500 },
    { name: 'Sun', value: 1400 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 650 },
    { name: 'Desktop', value: 350 },
  ];

  const productStats = [
    { id: '1', name: 'Midnight Silk Blazer', count: 452 },
    { id: '2', name: 'Ivory Cashmere Sweater', count: 312 },
    { id: '3', name: 'Arctic Blue Denim Jacket', count: 284 },
    { id: '4', name: 'Crimson Velvet Gown', count: 198 },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] p-8 md:p-16">
      <header className="mb-16">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-4">Command Center</p>
        <h1 className="text-6xl font-serif font-bold italic tracking-tight">Analytics.</h1>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { label: 'Total Try-Ons', value: stats.totalTryOns, icon: Activity, trend: '+14%' },
          { label: 'Active Silhouettes', value: stats.activeUsers, icon: Users, trend: '+22%' },
          { label: 'Conversion Lift', value: stats.conversionRate + '%', icon: TrendingUp, trend: '+5.2%' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-black/5 p-10 rounded-sm"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-sm">
                <item.icon size={18} />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-sm flex items-center gap-1">
                {item.trend} <ArrowUpRight size={10} />
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">{item.label}</p>
            <p className="text-4xl font-bold tracking-tighter">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white border border-black/5 p-10 rounded-sm">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-10">Usage Volume — 7 Day Delta</p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, opacity: 0.4 }} 
                  dy={20}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 10, fontWeight: 700, opacity: 0.4 }}
                />
                <Tooltip 
                  contentStyle={{ border: 'none', borderRadius: '0', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#000', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#000' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Split */}
        <div className="bg-white border border-black/5 p-10 rounded-sm flex flex-col">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-10">Client Environment</p>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="text-[10px] font-mono font-bold opacity-30 uppercase tracking-widest text-center">Split<br/>Mobile/Desk</span>
            </div>
          </div>
          <div className="mt-auto space-y-4 pt-8">
             {deviceData.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-40">{Math.round((item.value / 1000) * 100)}%</span>
               </div>
             ))}
          </div>
        </div>

        {/* Bottom Data Table */}
        <div className="lg:col-span-3 bg-white border border-black/5 p-10 rounded-sm">
           <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-10">Product Engagement Rankings</p>
           <table className="w-full">
              <thead>
                 <tr className="border-b border-black/5">
                    <th className="text-left py-4 text-[10px] uppercase tracking-widest text-zinc-300 font-bold">Artifact Name</th>
                    <th className="text-left py-4 text-[10px] uppercase tracking-widest text-zinc-300 font-bold">Category</th>
                    <th className="text-right py-4 text-[10px] uppercase tracking-widest text-zinc-300 font-bold">In-Engine Cycles</th>
                 </tr>
              </thead>
              <tbody>
                 {productStats.map((prod, idx) => (
                    <tr key={idx} className="border-b border-black/5 last:border-0 hover:bg-brand-bg transition-colors">
                       <td className="py-6 text-xs font-bold uppercase tracking-tight">{prod.name}</td>
                       <td className="py-6 text-[10px] text-zinc-400 uppercase tracking-widest">Premium Edit</td>
                       <td className="py-6 text-right text-xs font-mono font-bold opacity-60">{prod.count} hits</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
