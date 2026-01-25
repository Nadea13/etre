import { Gemunu_Libre } from "next/font/google"
import "./globals.css"

const gemunuLibre = Gemunu_Libre({
    variable: "--font-gemunu-libre",
    subsets: ["latin"]
})

export const metadata = {
    title: "ÊTRE",
    description: "ÊTRE Shop",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${gemunuLibre.className} antialiased`}>
                {children}
            </body>
        </html>
    )
}
