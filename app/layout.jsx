import { Chakra_Petch } from "next/font/google"
import "./globals.css"

const chakraPetch = Chakra_Petch({
    variable: "--font-chakra-petch",
    subsets: ["latin", "thai"],
    weight: ["300", "400", "500", "600", "700"]
})

export const metadata = {
    title: "ÊTRE",
    description: "ÊTRE Shop",
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
