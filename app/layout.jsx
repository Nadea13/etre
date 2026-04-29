import "./globals.css"

// Using system fonts instead of Google Fonts
const systemFonts = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

export const metadata = {
    title: {
        default: "ÊTRE | Rise With Confidence",
        template: "%s | ÊTRE"
    },
    description: "ÊTRE Sportswear - Experience the fusion of elite performance and street aesthetics. Premium activewear designed for precision and built for performance.",
    keywords: ["sportswear", "activewear", "premium training", "ÊTRE", "Rise With Confidence", "fitness fashion", "executive gym wear"],
    authors: [{ name: "ÊTRE" }],
    openGraph: {
        title: "ÊTRE | Rise With Confidence",
        description: "Experience the fusion of elite performance and street aesthetics.",
        url: "https://etre-nine.vercel.app",
        siteName: "ÊTRE Sportswear",
        locale: "th_TH",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "ÊTRE | Rise With Confidence",
        description: "Premium activewear designed for precision and built for performance.",
    },
    robots: {
        index: true,
        follow: true,
    }
}

import { CartProvider } from "./context/CartContext"
import CartDrawer from "./components/CartDrawer"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased" style={{ fontFamily: systemFonts }}>
                <CartProvider>
                    {children}
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    )
}
