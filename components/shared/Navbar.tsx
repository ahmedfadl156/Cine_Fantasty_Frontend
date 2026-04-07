import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-12 py-8">
            {/* Logo => والله انا احمد فضل اللى بيعمل الكومنتس علشان ابقا فاهم انا بعمل ايه ومتقسم صح*/}
            <h1 className="text-primary font-bold text-4xl">CGM</h1>
            {/* Navigation Links */}
            <div className="flex items-center gap-12">
                <Link href="/" className="text-on-surface hover:text-primary transition-colors">
                    Market
                </Link>
                <Link href="/my-studio" className="text-on-surface hover:text-primary transition-colors">
                    My Studio
                </Link>
                <Link href="/leagues" className="text-on-surface hover:text-primary transition-colors">
                    Leagues
                </Link>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <Link href="/login" className="text-on-surface uppercase hover:text-primary transition-colors">
                    Sign In
                </Link>
                <Link href="/register" className="text-on-surface uppercase px-6 py-2 rounded-lg bg-primary transition-colors">
                    Join Now
                </Link>
            </div>
        </nav>
    )
}

export default Navbar