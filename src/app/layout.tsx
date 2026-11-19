import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { CartDrawer } from "../components/CartDrawer";
import { SessionTimeoutProvider } from "../components/SessionTimeoutProvider";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { ChatWidget } from "../components/ChatWidget";


export const metadata: Metadata = {
  title: "The Takeout Box | Restaurant Supply & Wholesale Packaging Bakersfield CA",
  description:
    "Bakersfield's leading restaurant supplier for leak-proof PP takeout containers, eco-friendly bagasse paper plates, cups, cutlery, napkins, and aluminum catering trays. Pack Smarter, Serve Better.",
  keywords: [
    "takeout boxes",
    "paper plates",
    "restaurant supply Bakersfield",
    "meal prep containers",
    "disposable cutlery",
    "kraft bags",
    "aluminum foil pans",
    "biodegradable tableware",
  ],
  openGraph: {
    title: "The Takeout Box | Restaurant Supply & Packaging",
    description: "Your packaging is your first handshake. Quality food-safe containers for restaurants, food trucks, and caterers.",
    url: "https://www.thetakeoutbox.com",
    siteName: "The Takeout Box",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingWhatsApp />
          <ChatWidget />
          <SessionTimeoutProvider />
        </CartProvider>
      </body>
    </html>
  );
}

