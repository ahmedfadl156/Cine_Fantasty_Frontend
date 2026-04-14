import Link from "next/link";
import { Clapperboard, DiscIcon as Discord, ArrowUpRight, X } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 text-sm relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 gap-y-16 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-105 transition-transform">
                <Clapperboard className="text-black w-5 h-5 fill-black/20" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                CineFantasty
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-xs">
              Build your cinema empire. Buy distribution rights, climb the box office leaderboards, and become the world's greatest studio head.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                <X className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                <Discord className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all">
                <X className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide">The Studio</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/market" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1 group">
                  Marketplace 
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/my-studio" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1 group">
                  My Studio
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/leagues" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1 group">
                  Leagues
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1 group">
                  Global Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/how-it-works" className="text-zinc-400 hover:text-primary transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  Game Rules
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {currentYear} CineFantasty. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono">
            <span>Powered by</span>
            <span className="text-zinc-300 font-semibold tracking-widest pl-1 border-l border-zinc-700">Ahmed Fadl</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
