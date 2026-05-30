import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Upload, User, ArrowRight, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SAMPLE_MODELS = [
  { id: 'm1', name: 'Elite Silhouette A', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop' },
  { id: 'm2', name: 'Elite Silhouette B', url: 'https://images.unsplash.com/photo-1529139513402-e209979b1af8?q=80&w=1920&auto=format&fit=crop' },
];

export function PhotoUpload() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProductIds = location.state?.selectedProductIds || [];
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleProceed = () => {
    if (previewUrl) {
      navigate('/try-on', { state: { modelUrl: previewUrl, productIds: selectedProductIds } });
    }
  };

  const resetSelection = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar */}
      <div className="w-full md:w-[400px] border-r border-black/5 p-12 flex flex-col justify-between bg-brand-bg sticky top-20">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-6">Stage 02 — Calibration</p>
          <h1 className="text-[64px] md:text-[72px] leading-[0.85] font-serif italic mb-8">
            Upload <br/>Your <br/>Silhouette.
          </h1>
          <p className="text-xs leading-[1.8] text-zinc-500 max-w-[280px]">
            Please provide a clear, full-body photo with neutral lighting. Alternatively, select one of our curated studio models to test the pieces.
          </p>
        </div>

        <div className="space-y-8 mt-12 md:mt-0">
          <Button
            onClick={handleProceed}
            disabled={!previewUrl}
            className="w-full"
            size="lg"
            icon={ArrowRight}
          >
            Start Digital Try-On
          </Button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="flex-1 bg-white p-8 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!previewUrl ? (
              <motion.div
                key="upload-zone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12"
              >
                {/* File Drop */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-[400px] border border-dashed border-black/10 hover:border-black/30 transition-all cursor-pointer flex flex-col items-center justify-center p-12 bg-brand-bg/50 rounded-sm"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                  <div className="w-16 h-16 bg-white border border-black/5 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform">
                    <Upload size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Drop Silhouette</h3>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">JPG, PNG up to 10MB</p>
                </div>

                {/* Samples */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                    <User size={14} /> or test with a Studio Model
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {SAMPLE_MODELS.map((model) => (
                      <div
                        key={model.id}
                        onClick={() => setPreviewUrl(model.url)}
                        className="group relative aspect-video bg-zinc-100 rounded-sm overflow-hidden cursor-pointer border border-black/5 hover:border-black transition-all"
                      >
                        <img 
                          src={model.url} 
                          alt={model.name} 
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute bottom-4 left-4 text-[9px] uppercase font-bold tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          {model.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview-zone"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-[3/4] max-h-[600px] mx-auto bg-brand-card rounded-sm overflow-hidden border border-black/5 shadow-2xl"
              >
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={resetSelection}
                    className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-xl"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="absolute bottom-8 left-8">
                  <div className="px-4 py-2 bg-black/80 backdrop-blur-md text-white rounded-full flex items-center gap-2">
                    <ImageIcon size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Silhouette Locked</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
