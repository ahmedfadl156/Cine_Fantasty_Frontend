"use client";

import { useAuth, useLogout } from "@/hooks/auth/useAuth"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react"
import Image from "next/image"

const Navbar = () => {
    const { data , isLoading } = useAuth();
    const user = data?.user
    const logout = useLogout();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout.mutate();
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    }

    return (
        <nav className="relative flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#9C8E7E]/10 bg-background/80 backdrop-blur-md z-50">
            {/* Logo => والله انا احمد فضل اللى بيعمل الكومنتس علشان ابقا فاهم انا بعمل ايه ومتقسم صح*/}
            <Link href="/" className="z-50" onClick={() => setIsMobileMenuOpen(false)}>
                <h1 className="text-primary font-bold text-3xl md:text-4xl tracking-tight hover:opacity-80 transition-opacity">CGM</h1>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-12">
                <Link href="/market" className="text-sm font-medium tracking-wide text-on-surface hover:text-primary transition-colors">
                    Market
                </Link>
                <Link href="/my-studio" className="text-sm font-medium tracking-wide text-on-surface hover:text-primary transition-colors">
                    My Studio
                </Link>
                <Link href="/leagues" className="text-sm font-medium tracking-wide text-on-surface hover:text-primary transition-colors">
                    Leagues
                </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4 relative">
                {isLoading ? (
                    <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin"></div>
                ) : user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 hover:bg-[#1a1714] p-1.5 pr-3 rounded-full transition-all border border-transparent hover:border-[#9C8E7E]/30"
                        >
                            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-[#9C8E7E]/50 flex shrink-0">
                                {/* {user?.avatar ? (
                                    <Image src={user.avatar} alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary text-[#EEE4D4] font-bold text-lg">
                                        {(user?.studioName || "U").charAt(0).toUpperCase()}
                                    </div>
                                )} */}
                                    <div className="w-full h-full flex items-center justify-center bg-primary text-[#EEE4D4] font-bold text-lg">
                                        {(user?.studioName || "U").charAt(0).toUpperCase()}
                                    </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-[#9C8E7E] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute right-0 top-full mt-3 w-56 bg-surface-container-high border border-[#9C8E7E]/20 shadow-2xl rounded-xl py-2 transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <div className="px-4 py-3 border-b border-[#9C8E7E]/10 mb-2">
                                <p className="text-sm font-medium text-[#EEE4D4] truncate">{user?.studioName || "Cinematographer"}</p>
                                <p className="text-xs text-[#9C8E7E] truncate mt-0.5">{user?.email || "User Account"}</p>
                            </div>
                            <div className="flex flex-col gap-1 px-2">
                                <Link onClick={() => setIsDropdownOpen(false)} href="/account" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface hover:bg-surface-container-lowest hover:text-primary transition-colors">
                                    <User className="w-4 h-4" />
                                    Account Profile
                                </Link>
                                <div className="h-px bg-[#9C8E7E]/10 my-1 mx-2"></div>
                                <button onClick={handleLogout} className="flex items-center justify-between w-full text-left gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                                    <span className="flex items-center gap-3"><LogOut className="w-4 h-4" /> Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link href="/login" className="text-sm tracking-widest text-[#9C8E7E] uppercase hover:text-primary transition-colors mr-2">
                            Login
                        </Link>
                        <Link href="/signup" className="text-sm tracking-widest text-background font-medium uppercase px-6 py-2.5 rounded-sm bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                            Join Now
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
                className="md:hidden z-50 text-on-surface hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-[#9C8E7E]/20 flex flex-col items-center justify-start py-8 gap-8 md:hidden shadow-2xl origin-top animate-in fade-in slide-in-from-top-4 duration-300 h-screen-header">
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/market" className="text-lg font-medium text-on-surface hover:text-primary transition-colors">
                        Market
                    </Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/my-studio" className="text-lg font-medium text-on-surface hover:text-primary transition-colors">
                        My Studio
                    </Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/leagues" className="text-lg font-medium text-on-surface hover:text-primary transition-colors">
                        Leagues
                    </Link>
                    
                    <div className="w-24 h-px bg-[#9C8E7E]/20 my-2"></div>
                    
                    {isLoading ? (
                        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin mt-4"></div>
                    ) : user ? (
                        <div className="flex flex-col items-center gap-6 w-full px-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 rounded-full bg-surface-container-high border border-primary overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                    {/* {user?.avatar ? (
                                        <Image src={user.avatar} alt="Avatar" width={80} height={80} className="w-full h-full object-cover" />
                                    ) : ( */}
                                        <div className="w-full h-full flex items-center justify-center bg-primary text-[#EEE4D4] font-bold text-3xl">
                                            {(user?.studioName || "U").charAt(0).toUpperCase()}
                                        </div>
                                    {/* )} */}
                                </div>
                                <p className="text-lg font-medium text-[#EEE4D4] mt-2">{user?.studioName || "Cinematographer"}</p>
                                <p className="text-sm text-[#9C8E7E]">{user?.email || "User Account"}</p>
                            </div>
                            <div className="flex flex-col items-center gap-4 w-full max-w-xs mt-4">
                                <Link onClick={() => setIsMobileMenuOpen(false)} href="/account" className="flex items-center justify-center gap-2 w-full py-4 bg-surface-container-lowest rounded-lg text-sm text-primary transition-colors border border-[#9C8E7E]/10">
                                    <User className="w-4 h-4" /> Account Profile
                                </Link>
                                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-4 bg-red-500/10 rounded-lg text-sm text-red-500 transition-colors border border-red-500/20">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full max-w-xs mt-2">
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="w-full text-center py-4 tracking-widest text-[#9C8E7E] uppercase border border-[#9C8E7E]/30 rounded-sm hover:text-primary hover:border-primary transition-all">
                                Login
                            </Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/signup" className="w-full text-center py-4 tracking-widest text-background font-medium uppercase rounded-sm bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar