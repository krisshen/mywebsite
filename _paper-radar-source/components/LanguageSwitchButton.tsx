'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitchButton() {
    const { language, setLanguage } = useLanguage()

    const toggleLanguage = () => {
        setLanguage(language === 'zh' ? 'en' : 'zh')
    }

    return (
        <button
            onClick={toggleLanguage}
            className="
        fixed top-4 right-4 z-50
        flex items-center gap-1.5
        px-3 py-1.5
        bg-white border border-[#e2e2df] rounded-full
        text-sm font-medium text-[#6b7280]
        shadow-sm hover:shadow-md
        transition-all duration-200
        hover:text-[#c0392b] hover:border-[#c0392b]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c0392b] focus-visible:ring-offset-2
      "
            aria-label={`Switch to ${language === 'zh' ? 'English' : '中文'}`}
        >
            <span className="text-base">🌐</span>
            <span className="min-w-[2ch]">{language === 'zh' ? 'EN' : '中'}</span>
        </button>
    )
}
