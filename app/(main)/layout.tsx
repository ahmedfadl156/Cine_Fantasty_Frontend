import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col min-h-[100dvh]">
            <Navbar />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default layout;