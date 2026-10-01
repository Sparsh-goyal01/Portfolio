import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sparsh Goyal | Software Backend Developer",
  description:
    "Sparsh Goyal - Software Developer focused on backend development, data analytics, scalable systems, and problem solving.",
  keywords: [
    "Sparsh Goyal",
    "Backend Developer",
    "Software Engineer",
    "DSA",
    "Node.js",
    "Express.js",
    "TypeScript",
    "PostgreSQL",
    "Data Analytics",
  ],
  authors: [{ name: "Sparsh Goyal", url: "https://github.com/sparsh-goyal01" }],
  creator: "Sparsh Goyal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sparshgoyal.dev",
    title: "Sparsh Goyal | Software Backend Developer",
    description:
      "Backend-focused software developer building modern web applications, data analytics solutions, scalable systems, APIs, and problem-solving projects.",
    siteName: "Sparsh Goyal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sparsh Goyal | Software Backend Developer",
    description:
      "Sparsh Goyal - Software Developer focused on backend development and scalable systems.",
    creator: "@Sparshgoyal01",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="bg-background-primary text-text-primary min-h-screen antialiased selection:bg-accent-primary selection:text-black">
        {children}
      </body>
    </html>
  );
}
