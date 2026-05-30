import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Button } from '../components/Button';
import { ArrowLeft, Download, RotateCcw, Maximize2, Move } from 'lucide-react';
import { motion } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function TryOnResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { modelUrl, productIds } = location.state || {};
  
  const selectedProduct = MOCK_PRODUCTS.find(p => p.id === productIds?.[0]) || MOCK_PRODUCTS[0];
  
  const [scale, setScale] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!modelUrl) {
      navigate('/products');
    }
  }, [modelUrl, navigate]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Save to Firestore Analytics
    if (auth.currentUser) {
       addDoc(collection(db, 'tryOnResults'), {
         userId: auth.currentUser.uid,
         productId: selectedProduct.id,
         deviceType: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
         createdAt: serverTimestamp(),
       }).catch(console.error);
    }

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `virtue-fit-${selectedProduct.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[400px] border-r border-black/5 p-12 flex flex-col justify-between bg-brand-bg sticky top-20">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-6">Stage 03 — Overlay</p>
          <h1 className="text-[64px] md:text-[72px] leading-[0.85] font-serif italic mb-8">
            Perfect <br/>The <br/>Fit.
          </h1>
          <p className="text-xs leading-[1.8] text-zinc-500 mb-12">
            Use the calibration tools to adjust the digital piece. Our neural engine handles the drape, but positioning ensures the perfect silhouette.
          </p>

          <div className="space-y-10">
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <label className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                     <Maximize2 size={12} /> Scale
                   </label>
                   <span className="text-[10px] font-mono font-bold opacity-40">{Math.round(scale * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.01" 
                  value={scale} 
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-black h-1 bg-black/10 rounded-full appearance-none cursor-pointer"
                />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <label className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                     <Move size={12} /> Vertical Position
                   </label>
                   <span className="text-[10px] font-mono font-bold opacity-40">{posY}px</span>
                </div>
                <input 
                  type="range" 
                  min="-200" 
                  max="200" 
                  value={posY} 
                  onChange={(e) => setPosY(parseInt(e.target.value))}
                  className="w-full accent-black h-1 bg-black/10 rounded-full appearance-none cursor-pointer"
                />
             </div>
          </div>
        </div>

        <div className="space-y-4 mt-12 md:mt-0">
          <Button
            onClick={handleDownload}
            className="w-full"
            size="lg"
            icon={Download}
          >
            Export Look
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/products')}
            className="w-full"
            icon={RotateCcw}
          >
            Back to Catalog
          </Button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 md:p-12 overflow-hidden">
        <div className="relative group max-w-full">
           {/* Shadow effect */}
           <div className="absolute -inset-10 bg-black/[0.02] blur-3xl rounded-full pointer-events-none" />
           
           <div className="relative bg-brand-card shadow-[0_0_100px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden flex items-center justify-center max-h-[75vh]">
              {/* Background Model */}
              <img 
                src={modelUrl} 
                alt="Model" 
                className="max-h-full w-auto object-contain pointer-events-none" 
              />
              
              {/* Overlay Product */}
              <motion.div
                style={{ 
                  left: `calc(50% + ${posX}px)`,
                  top: `calc(50% + ${posY}px)`,
                  scale: scale 
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <img 
                  src={selectedProduct.transparentImageUrl || selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="w-3/4 h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
           </div>

           {/* Label Overlay */}
           <div className="absolute -bottom-8 left-0 right-0 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex flex-col">
                 <span className="text-[10px] font-mono tracking-extrawide text-zinc-300 uppercase">Artifact ID</span>
                 <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{selectedProduct.id}_XVL_99</span>
              </div>
              <div className="text-right">
                 <span className="text-[10px] font-mono tracking-extrawide text-zinc-300 uppercase">Verification</span>
                 <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-500/80">Coded Pass</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
