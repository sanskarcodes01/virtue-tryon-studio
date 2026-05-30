import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="h-12 bg-black text-white flex items-center px-12 justify-between mt-auto">
        <div className="flex gap-8">
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-60">System Status: Optimal</span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-60">Virtual Latency: 38ms</span>
        </div>
        <div className="flex gap-6">
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-60">Privacy Policy</span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium">© 2026 Virtue Aesthetics</span>
        </div>
      </footer>
    </div>
  );
}
