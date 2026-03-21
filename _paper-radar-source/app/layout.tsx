import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageSwitchButton from '@/components/LanguageSwitchButton'

export const metadata: Metadata = {
    title: 'PaperRadar — Daily AI Paper Digest',
    description: 'Curating 5–10 papers daily, making AI research accessible to everyone',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <LanguageProvider>
                    <LanguageSwitchButton />
                    {children}
                </LanguageProvider>
            </body>
        </html>
    )
}
