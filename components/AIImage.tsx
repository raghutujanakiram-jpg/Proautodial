
import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/geminiService';

interface AIImageProps {
  prompt: string;
  className?: string;
  aspectRatio?: string;
  alt?: string;
}

const AIImage: React.FC<AIImageProps> = ({ prompt, className = "", aspectRatio = "16:9", alt }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchImage = async () => {
      setError(null);
      setLoading(true);
      try {
        const result = await generateImage(prompt, aspectRatio);
        if (active) setSrc(result);
      } catch (err: any) {
        console.error("Image generation failed", err);
        const status = err?.status || err?.error?.code || err?.code;
        if (active) {
          if (status === 429 || status === 'RESOURCE_EXHAUSTED') {
            setError("Quota limit reached. Retrying soon...");
          } else {
            setError("Neural engine busy");
          }
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchImage();
    return () => { active = false; };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`bg-slate-100 dark:bg-slate-900 animate-pulse flex flex-col items-center justify-center gap-4 ${className}`}>
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase text-brand tracking-widest">{error || 'Synthesizing Visual...'}</p>
      </div>
    );
  }

  if (error && !src) {
    return (
      <div className={`bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-8 text-center gap-4 ${className}`}>
        <i className="fas fa-triangle-exclamation text-brand text-3xl"></i>
        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-brand/10 text-brand rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all"
        >
          Refresh Feed
        </button>
      </div>
    );
  }

  return src ? (
    <img src={src} alt={alt || prompt} className={`object-cover ${className}`} />
  ) : (
    <div className={`bg-slate-200 dark:bg-slate-800 flex items-center justify-center ${className}`}>
      <i className="fas fa-image text-slate-400"></i>
    </div>
  );
};

export default AIImage;
