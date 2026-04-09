import LoginForm from "@/components/LoginForm"
import Image from "next/image"

const page = () => {
    return (
        <main className="flex h-screen overflow-hidden">
            {/* Left Section Photo */}
            <div className="hidden lg:flex w-[40%] relative bg-[url('/login-bg.avif')] bg-cover bg-center">
                {/* Overlay with cinematic shadow (vignette/gradient) */}
                <div className="absolute inset-0 bg-linear-to-br from-black/90 via-[#16130f]/40 to-black/90 backdrop-grayscale-[0.5] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-12 z-10 w-full h-full">
                    <div className="flex flex-col gap-1">
                        <span className="data-mono text-[10px] tracking-[0.3em] text-[#9C8E7E] uppercase">Archive Fragment No. 72-04</span>
                        <h1 className="editorial-title text-5xl leading-tight text-[#EEE4D4]">The Golden Era of <br/>Independent Cinema.</h1>
                    </div>
                    <div className="space-y-6">
                        {/* Film Strip Card Component */}
                        <div className="bg-surface-container-high p-6 w-80 space-y-4 relative z-20 shadow-2xl">
                            <div className="aspect-2/3 bg-surface-container-lowest overflow-hidden relative">
                                <Image 
                                    className="object-cover opacity-80 grayscale" 
                                    alt="vintage monochrome film production still of a director looking through a lens in a darkened 1970s studio set" 
                                    src="/login-poster.png"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 320px"
                                />
                            </div>
                            <div>
                                <h3 className="editorial-title text-xl text-[#EEE4D4]">Metropolis Noir</h3>
                                <p className="text-sm font-light text-[#9C8E7E] mt-2">A study in shadows and urban isolation.</p>
                            </div>
                        </div>
                        <p className="data-mono text-[10px] tracking-tighter text-[#9C8E7E] max-w-xs leading-relaxed">
                            EST. 2026 CINEMAGM ARCHIVE. ALL FOOTAGE IS DIGITALLY PRESERVED AT 4K RESOLUTION.
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Section Login Form */}
            <div className="w-full lg:w-[60%] flex items-center justify-center overflow-y-auto px-4 md:px-6 lg:px-8">
                <LoginForm />
            </div>
        </main>
    )
}

export default page