'use client'

import { useState } from 'react'
import { generatedDateLabel, generatedYear, papers, SummaryMode, totalFilteredCount } from '@/data/papers'
import PaperCard from '@/components/PaperCard'
import ModeSwitcher from '@/components/ModeSwitcher'

export default function Home() {
    const [globalMode, setGlobalMode] = useState<SummaryMode>('general')

    return (
        <main className="min-h-screen bg-[#f5f5f3]">
            {/* ─── Hero Section ─── */}
            <header className="w-full border-b border-[#e2e2df] bg-[#f5f5f3]">
                <div className="max-w-[900px] mx-auto px-5 py-12 sm:py-16 text-center">
                    {/* Eyebrow */}
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9ca3af] mb-4">
                        Daily AI Paper Digest
                    </p>

                    {/* Logo */}
                    <h1
                        className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 select-none"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        Paper
                        <span className="text-[#c0392b]">Radar</span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-lg sm:text-xl text-[#6b7280] mb-6 max-w-md mx-auto leading-relaxed">
                        每天精选 5–10 篇，让任何人都能读懂 AI 论文
                    </p>

                    {/* Date badge */}
                    <div className="inline-flex items-center gap-2 bg-white border border-[#e2e2df] rounded-full px-4 py-1.5 text-sm text-[#6b7280] shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b] animate-pulse" />
                        {generatedDateLabel}
                    </div>
                </div>
            </header>

            <div className="max-w-[900px] mx-auto px-5">
                {/* ─── Value Props Bar ─── */}
                <section className="py-10 border-b border-[#e2e2df]">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
                        {[
                            { icon: '🔍', stat: `${totalFilteredCount} 篇`, label: '今日论文总量' },
                            { icon: '⭐', stat: `${papers.length} 篇`, label: '精选推荐' },
                            { icon: '📚', stat: '3 种', label: '阅读难度' },
                            { icon: '⏱', stat: '2 分钟', label: '平均阅读时长' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center gap-1">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'Georgia, serif' }}>
                                    {item.stat}
                                </span>
                                <span className="text-xs text-[#9ca3af] uppercase tracking-wider">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── Global Mode Switcher ─── */}
                <section className="py-8 border-b border-[#e2e2df] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-[#1a1a1a]">今日精选论文</h2>
                        <p className="text-sm text-[#9ca3af] mt-0.5">选择全局阅读难度，一键切换所有卡片</p>
                    </div>
                    <ModeSwitcher
                        currentMode={globalMode}
                        onChange={setGlobalMode}
                        variant="global"
                    />
                </section>

                {/* ─── Paper Cards ─── */}
                <section className="py-10 space-y-6">
                    {papers.map((paper) => (
                        <PaperCard key={paper.id} paper={paper} globalMode={globalMode} />
                    ))}
                </section>

                {/* ─── Footer ─── */}
                <footer className="border-t border-[#e2e2df] py-10 text-center">
                    <p
                        className="text-lg font-semibold text-[#1a1a1a] mb-1"
                        style={{ fontFamily: 'Georgia, serif' }}
                    >
                        Paper<span className="text-[#c0392b]">Radar</span>
                    </p>
                    <p className="text-sm text-[#9ca3af]">
                        每天用 AI 帮你精读前沿论文 · 不需要博士学位
                    </p>
                    <p className="text-xs text-[#c8c8c5] mt-4">
                        © {generatedYear} PaperRadar · 数据来自 arXiv
                    </p>
                </footer>
            </div>
        </main>
    )
}
