import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reels Pro - Share Your Story",
  description: "A mobile-first social media platform for sharing short-form video content. Create, discover, and share amazing reels with the world.",
  keywords: ["reels", "video", "social media", "short-form video", "content creation"],
  openGraph: {
    title: "Reels Pro - Share Your Story",
    description: "A mobile-first social media platform for sharing short-form video content.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen`}>
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
