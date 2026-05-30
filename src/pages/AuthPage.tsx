import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '../components/Button';
import { motion } from 'motion/react';
import { ShoppingBag, Chrome } from 'lucide-react';

export function AuthPage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/products');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-zinc-100 rounded-[2rem] p-12 shadow-sm"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6">
            <ShoppingBag className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-3">Welcome to Virtue</h1>
          <p className="text-zinc-500">
            Sign in to access your digital fitting room and saved collections.
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="w-full"
          size="lg"
          variant="secondary"
          icon={Chrome}
        >
          Sign in with Google
        </Button>

        <div className="mt-10 pt-10 border-t border-zinc-100">
          <p className="text-center text-xs text-zinc-400 leading-relaxed px-6">
            By continuing, you agree to Virtue's terms of service and our approach 
             to edge-processed privacy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
