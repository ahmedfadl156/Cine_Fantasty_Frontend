import { X } from "lucide-react";
import { useEffect } from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | React.ReactNode;
}

export default function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-surface-container-low border border-[#5c554d]/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#5c554d]/20 bg-[#16130f]">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#c8352a]" />
            <h2 className="font-display italic font-bold text-xl md:text-2xl text-[#eee4d4]">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9c8e7e] hover:text-[#eee4d4] hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto cinematic-scrollbar bg-surface-container-low text-[#eee4d4] font-mono text-sm leading-relaxed">
          {typeof content === 'string' ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            content
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-[#5c554d]/20 bg-[#16130f]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#c8352a] hover:bg-[#b02e24] text-white text-xs font-mono uppercase tracking-widest transition-all duration-300"
          >
            Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
