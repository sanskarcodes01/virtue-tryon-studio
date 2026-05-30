import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <nav className="h-20 px-12 fixed top-0 left-0 w-full z-50 flex items-center justify-between border-b border-black/5 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 group">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
            <span className="text-white font-bold text-xs">V</span>
          </div>
          <span className="font-bold tracking-tighter text-xl uppercase">Virtue</span>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        {user ? (
          <>
            <Link
              to="/products"
              className={`text-[10px] font-bold uppercase tracking-widest transition-opacity ${
                location.pathname === '/products' ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              Collections
            </Link>
            <Link
              to="/try-on"
              className={`text-[10px] font-bold uppercase tracking-widest transition-opacity ${
                location.pathname === '/try-on' ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              Lookbook
            </Link>
            <div className="flex items-center gap-4 pl-4 border-l border-black/5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-tight">{user.displayName}</span>
                <button
                  onClick={handleSignOut}
                  className="text-[9px] uppercase tracking-widest font-bold text-red-500/60 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
              <div className="w-8 h-8 rounded-full border border-black/10 overflow-hidden bg-brand-card">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || ''}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={14} className="text-black/20" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/auth"
            className="text-[10px] font-bold uppercase tracking-widest px-6 py-2 bg-black text-white rounded-sm hover:bg-zinc-800 transition-colors"
          >
            Enter Studio
          </Link>
        )}
      </div>
    </nav>
  );
}
