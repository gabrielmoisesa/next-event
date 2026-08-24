import type { Metadata } from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  variable: '--font-martian-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextEvent',
  description:
    'Descubra e gerencie eventos de tecnologia. Meetups, conferências e workshops para a comunidade dev, tudo em um só lugar.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
