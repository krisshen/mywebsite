'use client'

import { SummaryMode } from '@/data/papers'
import { useLanguage } from '@/contexts/LanguageContext'

interface ModeSwitcherProps {
    currentMode: SummaryMode
    onChange: (mode: SummaryMode) => void
    variant?: 'global' | 'card'
}

const modesConfig: { key: SummaryMode; emoji: string; zh: string; en: string }[] = [
    { key: 'expert', emoji: '🎓', zh: '专业版', en: 'Expert' },
    { key: 'general', emoji: '📖', zh: '通用版', en: 'General' },
    { key: 'lazy', emoji: '⚡', zh: '懒人版', en: 'Lazy' },
]

export default function ModeSwitcher({
    currentMode,
    onChange,
    variant = 'card',
}: ModeSwitcherProps) {
    const isGlobal = variant === 'global'
    const { language } = useLanguage()

    const getLabel = (key: SummaryMode): string => {
        const mode = modesConfig.find(m => m.key === key)
        return language === 'en' ? (mode?.en || key) : (mode?.zh || key)
    }

    return (
        <div
            className={`inline-flex rounded-full border border-[#e2e2df] overflow-hidden ${isGlobal ? 'bg-white shadow-sm' : 'bg-[#f5f5f3]'
                }`}
        >
            {modesConfig.map((mode) => {
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
                        <span>{getLabel(mode.key)}</span>
                    </button>
                )
            })}
        </div>
    )
}
