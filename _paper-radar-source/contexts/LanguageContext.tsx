'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'zh' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
    zh: {
        // Hero section
        'hero.eyebrow': 'Daily AI Paper Digest',
        'hero.tagline': '每天精选 5–10 篇，让任何人都能读懂 AI 论文',
        'hero.datePrefix': '更新于',

        // Value props
        'value.totalPapers': '今日论文总量',
        'value.selectedPapers': '精选推荐',
        'value.difficultyLevels': '阅读难度',
        'value.readTime': '平均阅读时长',
        'value.papersUnit': '篇',

        // Mode section
        'mode.title': '今日精选论文',
        'mode.subtitle': '选择全局阅读难度，一键切换所有卡片',

        // Paper card
        'card.readingMode': '阅读模式',
        'card.arxivLink': 'arXiv ↗',

        // Footer
        'footer.tagline': '每天用 AI 帮你精读前沿论文 · 不需要博士学位',
        'footer.copyright': '数据来自 arXiv',
    },
    en: {
        // Hero section
        'hero.eyebrow': 'Daily AI Paper Digest',
        'hero.tagline': 'Curating 5–10 papers daily, making AI research accessible to everyone',
        'hero.datePrefix': 'Updated',

        // Value props
        'value.totalPapers': "Today's Papers",
        'value.selectedPapers': 'Top Picks',
        'value.difficultyLevels': 'Difficulty Levels',
        'value.readTime': 'Avg. Read Time',
        'value.papersUnit': 'papers',

        // Mode section
        'mode.title': "Today's Top Papers",
        'mode.subtitle': 'Select reading difficulty to filter all cards',

        // Paper card
        'card.readingMode': 'Reading Mode',
        'card.arxivLink': 'arXiv ↗',

        // Footer
        'footer.tagline': 'AI-powered paper summaries · No PhD required',
        'footer.copyright': 'Data from arXiv',
    },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('zh')

    // Load language preference from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
            setLanguage(savedLang)
        }
    }, [])

    // Save language preference to localStorage when changed
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations[typeof language]] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
