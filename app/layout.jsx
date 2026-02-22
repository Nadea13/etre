import { Chakra_Petch } from "next/font/google"
import "./globals.css"

const chakraPetch = Chakra_Petch({
    variable: "--font-chakra-petch",
    subsets: ["latin", "thai"],
    weight: ["300", "400", "500", "600", "700"]
})

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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${chakraPetch.className} antialiased`}>
                {children}
            </body>
        </html>
    )
}
