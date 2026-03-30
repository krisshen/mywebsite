import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'

// A helper consumer component to expose context values in tests
function LanguageConsumer() {
    const { language, setLanguage, t } = useLanguage()
    return (
        <div>
            <span data-testid="language">{language}</span>
            <span data-testid="translation">{t('hero.tagline')}</span>
            <button onClick={() => setLanguage('en')}>Switch to EN</button>
            <button onClick={() => setLanguage('zh')}>Switch to ZH</button>
        </div>
    )
}

function renderWithProvider() {
    return render(
        <LanguageProvider>
            <LanguageConsumer />
        </LanguageProvider>
    )
}

beforeEach(() => {
    localStorage.clear()
})

describe('LanguageProvider', () => {
    it('defaults to Chinese ("zh") language', () => {
        renderWithProvider()
        expect(screen.getByTestId('language')).toHaveTextContent('zh')
    })

    it('loads saved language preference from localStorage on mount', () => {
        localStorage.setItem('language', 'en')
        renderWithProvider()
        expect(screen.getByTestId('language')).toHaveTextContent('en')
    })

    it('ignores invalid values in localStorage', () => {
        localStorage.setItem('language', 'fr')
        renderWithProvider()
        // falls back to default 'zh'
        expect(screen.getByTestId('language')).toHaveTextContent('zh')
    })

    it('updates language when setLanguage is called', async () => {
        const user = userEvent.setup()
        renderWithProvider()
        expect(screen.getByTestId('language')).toHaveTextContent('zh')
        await user.click(screen.getByText('Switch to EN'))
        expect(screen.getByTestId('language')).toHaveTextContent('en')
    })

    it('saves language preference to localStorage when changed', async () => {
        const user = userEvent.setup()
        renderWithProvider()
        await user.click(screen.getByText('Switch to EN'))
        expect(localStorage.getItem('language')).toBe('en')
    })

    it('switching back to zh saves "zh" to localStorage', async () => {
        const user = userEvent.setup()
        localStorage.setItem('language', 'en')
        renderWithProvider()
        await user.click(screen.getByText('Switch to ZH'))
        expect(localStorage.getItem('language')).toBe('zh')
    })
})

describe('useLanguage hook', () => {
    it('throws an error when used outside LanguageProvider', () => {
        // Suppress console.error for this expected error boundary test
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        expect(() => render(<LanguageConsumer />)).toThrow(
            'useLanguage must be used within a LanguageProvider'
        )
        consoleSpy.mockRestore()
    })
})

describe('t() translation function', () => {
    it('returns Chinese translations for zh language', () => {
        renderWithProvider()
        // Default is 'zh'
        expect(screen.getByTestId('translation')).toHaveTextContent(
            '每天精选 5–10 篇，让任何人都能读懂 AI 论文'
        )
    })

    it('returns English translations after switching to en', async () => {
        const user = userEvent.setup()
        renderWithProvider()
        await user.click(screen.getByText('Switch to EN'))
        expect(screen.getByTestId('translation')).toHaveTextContent(
            'Curating 5–10 papers daily, making AI research accessible to everyone'
        )
    })

    it('returns the key itself when a translation key is missing', () => {
        function MissingKeyConsumer() {
            const { t } = useLanguage()
            return <span data-testid="missing">{t('nonexistent.key')}</span>
        }
        render(
            <LanguageProvider>
                <MissingKeyConsumer />
            </LanguageProvider>
        )
        expect(screen.getByTestId('missing')).toHaveTextContent('nonexistent.key')
    })

    it('translates all expected keys in zh', () => {
        const expectedKeys = [
            'hero.eyebrow',
            'hero.tagline',
            'hero.datePrefix',
            'value.totalPapers',
            'value.selectedPapers',
            'value.difficultyLevels',
            'value.readTime',
            'value.papersUnit',
            'mode.title',
            'mode.subtitle',
            'card.readingMode',
            'card.arxivLink',
            'footer.tagline',
            'footer.copyright',
        ]
        function AllKeysConsumer() {
            const { t } = useLanguage()
            return (
                <>
                    {expectedKeys.map((key) => (
                        <span key={key} data-testid={key}>
                            {t(key)}
                        </span>
                    ))}
                </>
            )
        }
        render(
            <LanguageProvider>
                <AllKeysConsumer />
            </LanguageProvider>
        )
        for (const key of expectedKeys) {
            // The translation should not just return the key (i.e., a real value exists)
            const text = screen.getByTestId(key).textContent
            expect(text).not.toBe(key)
            expect(text!.length).toBeGreaterThan(0)
        }
    })

    it('translates all expected keys in en', async () => {
        const expectedKeys = [
            'hero.eyebrow',
            'hero.tagline',
            'hero.datePrefix',
            'value.totalPapers',
            'value.selectedPapers',
            'value.difficultyLevels',
            'value.readTime',
            'value.papersUnit',
            'mode.title',
            'mode.subtitle',
            'card.readingMode',
            'card.arxivLink',
            'footer.tagline',
            'footer.copyright',
        ]
        function AllKeysConsumer() {
            const { language, setLanguage, t } = useLanguage()
            return (
                <>
                    <button onClick={() => setLanguage('en')}>EN</button>
                    {expectedKeys.map((key) => (
                        <span key={key} data-testid={key}>
                            {t(key)}
                        </span>
                    ))}
                </>
            )
        }
        const user = userEvent.setup()
        render(
            <LanguageProvider>
                <AllKeysConsumer />
            </LanguageProvider>
        )
        await user.click(screen.getByText('EN'))
        for (const key of expectedKeys) {
            const text = screen.getByTestId(key).textContent
            expect(text).not.toBe(key)
            expect(text!.length).toBeGreaterThan(0)
        }
    })
})
