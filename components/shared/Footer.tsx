"use client";

import Link from "next/link";
import { Clapperboard, DiscIcon as Discord, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import InfoModal from "./InfoModal";

const MODAL_CONTENT = {
  gameRules: {
    title: "Game Rules",
    content: `1. Draft or buy distribution rights for upcoming movies before their release.
2. Movie values are tied exactly to their real-world global box office gross.
3. The player with the highest Total Net Worth (Cash + Box Office Gross of owned movies) at the end of the season wins.
4. Any unsportsmanlike behavior or attempting to exploit the platform will result in immediate disqualification.`
  },
  faq: {
    title: "Frequently Asked Questions",
    content: `Q: How is the box office data updated?
A: Our servers sync with international box office APIs daily to reflect the most accurate earnings.

Q: What happens if a movie gets delayed?
A: If a movie is bumped out of the current season window, its value is locked at its current gross, or you can trade it away.

Q: Can I join multiple leagues?
A: Yes! You can create and join multiple public and private leagues.`
  },
  terms: {
    title: "Terms of Service",
    content: `By using CineFantasty, you agree to our platform rules. 

This is a simulation game—no real money is gambled or earned. Accounts found using automated scrubbing/trading scripts may be suspended. 

We reserve the right to correct any box office data discrepancies without prior notice to ensure fair play.`
  },
  privacy: {
    title: "Privacy Policy",
    content: `Your privacy matters to us. 

We store basic profile details (email, username, encrypted password) essential to game functionality. We use strictly necessary cookies to keep you logged in. 

Your data is never sold to third-party ad networks or data brokers.`
  },
  cookies: {
    title: "Cookie Policy",
    content: `CineFantasty uses essential cookies to manage your session and keep you logged into the application securely. 

We do not use cross-site tracking or advertising cookies. By continuing to use our platform, you consent to the use of these absolutely necessary session cookies.`
  }
};

type ModalContentType = keyof typeof MODAL_CONTENT | null;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [activeModal, setActiveModal] = useState<ModalContentType>(null);

  const openModal = (e: React.MouseEvent, type: ModalContentType) => {
    e.preventDefault();
    setActiveModal(type);
  };

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
                <Link href={"/how-it-works"}  className="text-zinc-400 hover:text-primary transition-colors">
                  How to Play
                </Link>
              </li>
              <li>
                <button onClick={(e) => openModal(e, 'gameRules')} className="text-zinc-400 hover:text-primary transition-colors">
                  Game Rules
                </button>
              </li>
              <li>
                <button onClick={(e) => openModal(e, 'faq')} className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-6 tracking-wide">Legal</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={(e) => openModal(e, 'terms')} className="text-zinc-400 hover:text-primary transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={(e) => openModal(e, 'privacy')} className="text-zinc-400 hover:text-primary transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={(e) => openModal(e, 'cookies')} className="text-zinc-400 hover:text-primary transition-colors">
                  Cookie Policy
                </button>
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

      <InfoModal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        title={activeModal ? MODAL_CONTENT[activeModal].title : ""}
        content={activeModal ? MODAL_CONTENT[activeModal].content : ""}
      />
    </footer>
  );
}
