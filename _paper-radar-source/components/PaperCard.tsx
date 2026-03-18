'use client'

import { useState, useEffect, useRef } from 'react'
import { Paper, SummaryMode } from '@/data/papers'
import ModeSwitcher from './ModeSwitcher'

interface PaperCardProps {
    paper: Paper
    globalMode: SummaryMode
}

function StarRating({ score }: { score: number }) {
    const normalizedScore = Math.max(0, Math.min(5, score / 2))

    return (
        <div className="flex items-center gap-1.5" aria-label={`评分 ${score} / 10`}>
            <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => {
                    const fill = Math.max(0, Math.min(1, normalizedScore - i))
                    return (
                        <span key={i} className="relative text-base leading-none text-[#d1d1ce]">
                            <span>★</span>
                            {fill > 0 ? (
                                <span
                                    className="absolute inset-y-0 left-0 overflow-hidden text-[#c0392b]"
                                    style={{ width: `${fill * 100}%` }}
                                >
                                    ★
                                </span>
                            ) : null}
                        </span>
                    )
                })}
            </div>
            <span className="text-sm font-medium text-[#6b7280]">{score.toFixed(1)}</span>
        </div>
    )
}

export default function PaperCard({ paper, globalMode }: PaperCardProps) {
    const [mode, setMode] = useState<SummaryMode>(globalMode)
    const [visible, setVisible] = useState(true)
    const prevGlobalMode = useRef(globalMode)
    const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function clearFadeTimeout() {
        if (fadeTimeoutRef.current) {
            clearTimeout(fadeTimeoutRef.current)
            fadeTimeoutRef.current = null
        }
    }

    // Sync with global mode changes
    useEffect(() => {
        if (globalMode !== prevGlobalMode.current) {
            prevGlobalMode.current = globalMode
            triggerFade(globalMode)
        }
    }, [globalMode])

    useEffect(() => clearFadeTimeout, [])

    function triggerFade(newMode: SummaryMode) {
        clearFadeTimeout()
        setVisible(false)
        fadeTimeoutRef.current = setTimeout(() => {
            setMode(newMode)
            setVisible(true)
            fadeTimeoutRef.current = null
        }, 150)
    }

    function handleModeChange(newMode: SummaryMode) {
        if (newMode === mode) return
        triggerFade(newMode)
    }

    const modeLabels: Record<SummaryMode, string> = {
        expert: '专业版',
        general: '通用版',
        lazy: '懒人版',
    }

    return (
        <article
            className="
        group relative bg-white rounded-2xl border border-[#e2e2df]
        shadow-[0_1px_4px_rgba(0,0,0,0.07),_0_4px_16px_rgba(0,0,0,0.05)]
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.1),_0_12px_32px_rgba(0,0,0,0.08)]
        hover:-translate-y-0.5
        transition-all duration-300 ease-out
        overflow-hidden
      "
        >
            {/* Top accent line */}
            <div className="h-0.5 bg-gradient-to-r from-[#c0392b] to-[#e74c3c] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-6 sm:p-8">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                        {/* Issue number */}
                        <span
                            className="
                text-4xl font-bold leading-none select-none
                text-[#e8e8e6] group-hover:text-[#f0d0cd]
                transition-colors duration-300
                font-serif shrink-0 mt-1
              "
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            {paper.id}
                        </span>
                        <div>
                            <h2
                                className="text-lg sm:text-xl font-semibold text-[#1a1a1a] leading-snug mb-1"
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                {paper.title}
                            </h2>
                            <p className="text-sm text-[#9ca3af]">
                                {paper.authors} · {paper.year}
                            </p>
                        </div>
                    </div>
                    {/* Star rating */}
                    <div className="shrink-0 mt-1">
                        <StarRating score={paper.recommendationScore} />
                    </div>
                </div>

                {/* Mode switcher */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs text-[#9ca3af] uppercase tracking-widest font-medium hidden sm:block">
                        阅读模式
                    </span>
                    <ModeSwitcher
                        currentMode={mode}
                        onChange={handleModeChange}
                        variant="card"
                    />
                </div>

                {/* Summary */}
                <div
                    className={`
            text-[15px] text-[#374151] leading-relaxed rounded-xl
            bg-[#f9f9f8] border border-[#eeeeed] p-4
            min-h-[80px]
            transition-opacity duration-[200ms]
            ${visible ? 'opacity-100' : 'opacity-0'}
          `}
                    data-mode={mode}
                >
                    <p className={visible ? 'summary-fade' : ''}>
                        {paper.summaries[mode]}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-[#9ca3af] bg-[#f5f5f3] px-2.5 py-1 rounded-full border border-[#e8e8e6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b]" />
                        {modeLabels[mode]}
                    </span>
                    <a
                        href={paper.arxivUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              text-xs text-[#9ca3af] hover:text-[#c0392b]
              underline underline-offset-2 decoration-[#d1d1ce]
              hover:decoration-[#c0392b] transition-colors duration-150
            "
                    >
                        arXiv ↗
                    </a>
                </div>
            </div>
        </article>
    )
}
