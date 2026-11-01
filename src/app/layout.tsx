import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
// import { Toaster } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/loader/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KnitCivic — Together We Can",
  description:
    "Join our community of kind people and take part in meaningful events that help build a better, stronger and more compassionate society.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("knit-civic-theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Loader>
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* <Toaster /> */}
          <Toaster position="top-right" richColors />
          <Footer />
        </Loader>
      </body>
    </html>
  );
}
