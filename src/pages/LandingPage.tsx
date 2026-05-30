import { Button } from '../components/Button';
import { ArrowRight, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-12 pt-24 pb-32 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-3/5 text-left">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[11px] font-mono uppercase tracking-[0.4em] text-zinc-400 mb-8"
          >
            Digital Couture Series 01
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[80px] md:text-[140px] leading-[0.85] font-serif italic mb-12 tracking-tight"
          >
            The <br/>New <br/>Silhouette.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base text-zinc-500 max-w-sm mb-12 leading-relaxed"
          >
            Experience high-fidelity 3D garment draping mapped instantly to your uploaded silhouette.
            Curated pieces for a digital era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto" icon={ArrowRight}>
                Enter Studio
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:w-2/5 aspect-[3/4] bg-brand-card rounded-sm overflow-hidden relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1539109132314-d4a8c97e19b0?q=80&w=1974&auto=format&fit=crop" 
            alt="Editorial fashion" 
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[24px] border-brand-bg opacity-20 pointer-events-none" />
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="bg-white py-32 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-12">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-16 text-center">Core Pillars</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="flex flex-col gap-8 group">
              <span className="text-4xl font-serif italic text-zinc-200 group-hover:text-black transition-colors duration-500">I</span>
              <h3 className="text-sm font-bold uppercase tracking-widest">Neural Precision</h3>
              <p className="text-xs text-zinc-400 leading-loose">
                Proprietary SVG-warping algorithms that respect the physical weight and drape of luxury fabrics.
              </p>
            </div>
            <div className="flex flex-col gap-8 group">
              <span className="text-4xl font-serif italic text-zinc-200 group-hover:text-black transition-colors duration-500">II</span>
              <h3 className="text-sm font-bold uppercase tracking-widest">Edge Privacy</h3>
              <p className="text-xs text-zinc-400 leading-loose">
                Processing occurs natively on your device. We do not store silhouettes, only the style data.
              </p>
            </div>
            <div className="flex flex-col gap-8 group">
              <span className="text-4xl font-serif italic text-zinc-200 group-hover:text-black transition-colors duration-500">III</span>
              <h3 className="text-sm font-bold uppercase tracking-widest">Coded Tailoring</h3>
              <p className="text-xs text-zinc-400 leading-loose">
                Every digital garment is an exact 1:1 twin of its physical counterpart, verified by artisans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">
              Ready to redefine <br /> your wardrobe?
            </h2>
            <p className="text-zinc-500 mb-8 text-lg">
              Join thousands of collectors who are already using Virtue to curate 
              their digital and physical style collections.
            </p>
            <Link to="/auth">
              <Button variant="outline" size="lg">Get Started Now</Button>
            </Link>
          </div>
          <div className="md:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden bg-zinc-100">
             <img 
               src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
               alt="Fashion showcase" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Winter Collection</p>
                <p className="font-serif text-2xl font-bold italic">Midnight Silence</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
