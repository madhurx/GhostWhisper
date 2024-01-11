import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Ghost Whisper App',
    description: 'Anonymous messaging app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="h-full">
            <head />
            <body
                className={cn('relative h-full antialiased', poppins.className)}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="relative flex flex-col min-h-screen">
                        <div className="flex-1">
                            <Navbar />
                            {children}
                        </div>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
