'use client'

import { SummaryMode } from '@/data/papers'

interface ModeSwitcherProps {
    currentMode: SummaryMode
    onChange: (mode: SummaryMode) => void
    variant?: 'global' | 'card'
}

const modes: { key: SummaryMode; label: string; emoji: string }[] = [
    { key: 'expert', label: '专业版', emoji: '🎓' },
    { key: 'general', label: '通用版', emoji: '📖' },
    { key: 'lazy', label: '懒人版', emoji: '⚡' },
]

export default function ModeSwitcher({
    currentMode,
    onChange,
    variant = 'card',
}: ModeSwitcherProps) {
    const isGlobal = variant === 'global'

    return (
        <div
            className={`inline-flex rounded-full border border-[#e2e2df] overflow-hidden ${isGlobal ? 'bg-white shadow-sm' : 'bg-[#f5f5f3]'
                }`}
        >
            {modes.map((mode) => {
                const isActive = currentMode === mode.key
                return (
                    <button
                        key={mode.key}
                        onClick={() => onChange(mode.key)}
                        className={`
              flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c0392b] focus-visible:ring-offset-1
              ${isGlobal
                                ? `px-4 py-2 text-base ${isActive
                                    ? 'bg-[#c0392b] text-white'
                                    : 'text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f5f5f3]'
                                }`
                                : `${isActive
                                    ? 'bg-[#c0392b] text-white'
                                    : 'text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#ebebea]'
                                }`
                            }
            `}
                    >
                        <span className="hidden sm:inline">{mode.emoji}</span>
                        <span>{mode.label}</span>
                    </button>
                )
            })}
        </div>
    )
}
