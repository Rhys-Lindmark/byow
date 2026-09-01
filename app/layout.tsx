import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://byow.rhyslindmark.chatgpt.site'),
  title: 'BYOW — Build Your Own Website',
  description: 'A website that rebuilds itself through one permanent chat.',
  openGraph: {
    title: 'BYOW — Build Your Own Website',
    description: 'The page can change. The chat stays.',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'BYOW — The page can change. The chat stays.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYOW — Build Your Own Website',
    description: 'The page can change. The chat stays.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
