import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'PaperRadar — 每天精选 AI 论文',
    description: '每天从海量 AI 论文中精选 3–5 篇，提供专业版、通用版、懒人版三种阅读难度，让任何人都能读懂 AI 论文。',
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
            <body>{children}</body>
        </html>
    )
}
