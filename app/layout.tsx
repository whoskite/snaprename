import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import type { Metadata } from "next"
import "./globals.css"
import type React from "react" // Added import for React
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "SnapRename: Bulk Image Wizard",
  description: "Easily rename and organize your images in bulk",
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  openGraph: {
    title: "SnapRename: Bulk Image Wizard",
    description: "Easily rename and organize your images in bulk",
    images: [
      {
        url: "/Social%20Sharing%20Image.png",
        width: 1200,
        height: 630,
        alt: "SnapRename - Bulk rename and download images",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapRename: Bulk Image Wizard",
    description: "Easily rename and organize your images in bulk",
    images: ["/Social%20Sharing%20Image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

