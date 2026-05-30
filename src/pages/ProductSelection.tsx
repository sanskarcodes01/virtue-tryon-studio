import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { Product } from '../types';
import { Button } from '../components/Button';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

export function ProductSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleProceed = () => {
    if (selectedIds.length > 0) {
      // For now we just pick the first one for the try-on flow as per standard simple UX, 
      // or we could pass the whole array.
      navigate('/upload', { state: { selectedProductIds: selectedIds } });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[400px] md:min-h-[calc(100vh-128px)] border-r border-black/5 p-12 flex flex-col justify-between bg-brand-bg sticky top-20">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-6">Stage 01 — Selection</p>
          <h1 className="text-[64px] md:text-[72px] leading-[0.85] font-serif italic mb-8">
            Select <br/>Your <br/>Pieces.
          </h1>
          <p className="text-xs leading-[1.8] text-zinc-500 max-w-[280px]">
            Choose from our curated digital vault. Each piece is modeled in high-fidelity 3D to ensure accurate draping on your silhouette.
          </p>
        </div>

        <div className="space-y-8 mt-12 md:mt-0">
          <div className="flex items-end gap-4 border-b border-black/5 pb-4">
            <span className="text-6xl font-light font-serif">{selectedIds.length.toString().padStart(2, '0')}</span>
            <span className="text-[9px] uppercase tracking-[0.2em] pb-3 opacity-50 font-bold">Items Selected</span>
          </div>
          
          <Button
            onClick={handleProceed}
            disabled={selectedIds.length === 0}
            className="w-full"
            size="lg"
            icon={ArrowRight}
          >
            Upload Silhouette
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 bg-white p-8 md:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => {
            const isSelected = selectedIds.includes(product.id);
            return (
              <motion.div
                key={product.id}
                onClick={() => toggleSelection(product.id)}
                className={`group relative flex flex-col cursor-pointer border p-3 transition-all duration-300 ${
                  isSelected ? 'border-black bg-brand-bg' : 'border-black/5 hover:border-black/20'
                }`}
              >
                <div className="bg-brand-card aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 ${
                      isSelected ? 'grayscale-0 scale-105' : 'group-hover:grayscale-0'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-black text-white flex items-center justify-center">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>

                <div className="mt-4 px-1">
                  <p className="text-[10px] uppercase font-bold tracking-tight mb-1">{product.name}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-medium">{product.category}</p>
                    <p className="text-[10px] font-mono text-zinc-900">${product.price}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
