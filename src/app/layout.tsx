import type { Metadata } from "next";
import { Inter } from "next/font/google";
import site from "@/config/site";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import "@/styles/global.css";

const inter = Inter({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/favicon/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    site: "",
    siteId: "",
    creator: "",
    creatorId: "",
    images: [`${site.url}/images/og.png`],
  },
  keywords: site.keywords,
  creator: "Wil.",
  openGraph: {
    url: site.url,
    type: "website",
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: "fr-FR",
    images: [
      {
        url: `${site.url}/images/og.png`,
        width: 1200,
        height: 630,
        alt: site.description,
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: "/favicon/favicon.svg",
    shortcut: "/favicon/favicon.svg",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [...site.favicons],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Y3FERSZ3BR`}
      />
      <Script id="google-analytics-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y3FERSZ3BR');
        `}
      </Script>

      <ThemeProvider>
        <main className="flex flex-col min-h-screen overflow-hidden z-30">
          {children}
        </main>
      </ThemeProvider>
    </html>
  );
}
