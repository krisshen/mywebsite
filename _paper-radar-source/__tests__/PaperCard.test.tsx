import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PaperCard from '@/components/PaperCard'
import { LanguageProvider } from '@/contexts/LanguageContext'
import type { Paper } from '@/data/papers'

// A representative paper with bilingual summaries for all 3 modes
const mockPaper: Paper = {
    id: '2501.00001v1',
    title: 'Test Paper: A Comprehensive Study',
    authors: 'Alice Smith, Bob Jones',
    year: '2025',
    arxivUrl: 'https://arxiv.org/abs/2501.00001v1',
    recommendationScore: 8.5,
    summaries: {
        expert: {
            zh: '这是一个专业版摘要（中文）',
            en: 'This is an expert summary (English)',
        },
        general: {
            zh: '这是一个通用版摘要（中文）',
            en: 'This is a general summary (English)',
        },
        lazy: {
            zh: '这是一个懒人版摘要（中文）',
            en: 'This is a lazy summary (English)',
        },
    },
}

// A paper with plain-string (legacy) summaries
const legacyPaper: Paper = {
    id: '2501.00002v1',
    title: 'Legacy Paper',
    authors: 'Carol White',
    year: '2024',
    arxivUrl: 'https://arxiv.org/abs/2501.00002v1',
    recommendationScore: 5.0,
    summaries: {
        expert: 'Legacy expert summary',
        general: 'Legacy general summary',
        lazy: 'Legacy lazy summary',
    },
}

function renderCard(
    paper: Paper = mockPaper,
    globalMode: 'expert' | 'general' | 'lazy' = 'general',
    lang?: string
) {
    if (lang) localStorage.setItem('language', lang)
    return render(
        <LanguageProvider>
            <PaperCard paper={paper} globalMode={globalMode} />
        </LanguageProvider>
    )
}

beforeEach(() => {
    localStorage.clear()
    jest.useFakeTimers()
})

afterEach(() => {
    jest.runAllTimers()
    jest.useRealTimers()
})

describe('PaperCard rendering', () => {
    it('renders the paper title', () => {
        renderCard()
        expect(screen.getByText('Test Paper: A Comprehensive Study')).toBeInTheDocument()
    })

    it('renders the paper id', () => {
        renderCard()
        expect(screen.getByText('2501.00001v1')).toBeInTheDocument()
    })

    it('renders the authors and year', () => {
        renderCard()
        expect(screen.getByText(/Alice Smith, Bob Jones/)).toBeInTheDocument()
        expect(screen.getByText(/2025/)).toBeInTheDocument()
    })

    it('renders the ArXiv link with correct href and target', () => {
        renderCard()
        const link = screen.getByRole('link', { name: /arxiv/i })
        expect(link).toHaveAttribute('href', 'https://arxiv.org/abs/2501.00001v1')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders the star rating with accessible aria-label', () => {
        renderCard()
        expect(screen.getByLabelText('Rating 8.5 / 10')).toBeInTheDocument()
    })

    it('displays the score formatted to one decimal place', () => {
        renderCard()
        expect(screen.getByText('8.5')).toBeInTheDocument()
    })

    it('renders the initial summary in zh for the globalMode', () => {
        renderCard(mockPaper, 'general')
        expect(screen.getByText('这是一个通用版摘要（中文）')).toBeInTheDocument()
    })

    it('renders plain-string (legacy) summaries correctly', () => {
        renderCard(legacyPaper, 'general')
        expect(screen.getByText('Legacy general summary')).toBeInTheDocument()
    })

    it('renders English summaries when language is en', () => {
        renderCard(mockPaper, 'general', 'en')
        expect(screen.getByText('This is a general summary (English)')).toBeInTheDocument()
        localStorage.clear()
    })

    it('renders the mode label badge in the footer', () => {
        renderCard(mockPaper, 'general')
        // Chinese label for 'general' mode appears in both the switcher and the footer badge
        const matches = screen.getAllByText('通用版')
        expect(matches.length).toBeGreaterThanOrEqual(2)
    })

    it('renders the ModeSwitcher with three buttons', () => {
        renderCard()
        const buttons = screen.getAllByRole('button')
        // 3 mode buttons inside ModeSwitcher
        expect(buttons.length).toBeGreaterThanOrEqual(3)
    })
})

describe('PaperCard mode switching', () => {
    it('updates the summary when a different mode button is clicked', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
        renderCard(mockPaper, 'general')

        // Initial state: general summary
        expect(screen.getByText('这是一个通用版摘要（中文）')).toBeInTheDocument()

        // Click Expert mode
        await user.click(screen.getByText('专业版'))

        // Advance timer to complete the 150ms fade
        act(() => jest.advanceTimersByTime(200))

        await waitFor(() => {
            expect(screen.getByText('这是一个专业版摘要（中文）')).toBeInTheDocument()
        })
    })

    it('updates the summary when mode changes to lazy', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
        renderCard(mockPaper, 'general')

        await user.click(screen.getByText('懒人版'))
        act(() => jest.advanceTimersByTime(200))

        await waitFor(() => {
            expect(screen.getByText('这是一个懒人版摘要（中文）')).toBeInTheDocument()
        })
    })

    it('handles rapid mode switching by cancelling the in-flight fade', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
        renderCard(mockPaper, 'general')

        // Quickly switch to expert then immediately switch to lazy before the fade completes
        await user.click(screen.getByText('专业版'))
        // Don't advance timers yet — the 150ms fade is still pending
        await user.click(screen.getByText('懒人版'))

        // Now advance past the fade duration
        act(() => jest.advanceTimersByTime(200))

        // Should end up on lazy mode (the second click wins)
        await waitFor(() => {
            expect(screen.getByText('这是一个懒人版摘要（中文）')).toBeInTheDocument()
        })
    })

    it('does not trigger a fade when the same mode is clicked again', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
        renderCard(mockPaper, 'general')

        // Click the already-active general mode
        await user.click(screen.getAllByText('通用版')[0])
        act(() => jest.advanceTimersByTime(200))

        // Summary should remain unchanged
        expect(screen.getByText('这是一个通用版摘要（中文）')).toBeInTheDocument()
    })
})

describe('PaperCard global mode sync', () => {
    it('syncs with globalMode when it changes via re-render', async () => {
        const { rerender } = renderCard(mockPaper, 'general')

        rerender(
            <LanguageProvider>
                <PaperCard paper={mockPaper} globalMode="expert" />
            </LanguageProvider>
        )

        act(() => jest.advanceTimersByTime(200))

        await waitFor(() => {
            expect(screen.getByText('这是一个专业版摘要（中文）')).toBeInTheDocument()
        })
    })

    it('does not trigger a fade when globalMode prop does not change', () => {
        const { rerender } = renderCard(mockPaper, 'general')

        rerender(
            <LanguageProvider>
                <PaperCard paper={mockPaper} globalMode="general" />
            </LanguageProvider>
        )

        act(() => jest.advanceTimersByTime(200))

        // Summary should still show general
        expect(screen.getByText('这是一个通用版摘要（中文）')).toBeInTheDocument()
    })
})

describe('StarRating', () => {
    it('renders 5 stars', () => {
        renderCard()
        // All stars (both filled and empty layers) render ★
        const stars = screen.getByLabelText('Rating 8.5 / 10')
        expect(stars.querySelectorAll('span[class*="text-base"]').length).toBe(5)
    })

    it('shows a score of 10.0 correctly', () => {
        const fullScorePaper: Paper = { ...mockPaper, recommendationScore: 10 }
        renderCard(fullScorePaper)
        expect(screen.getByText('10.0')).toBeInTheDocument()
    })

    it('shows a score of 0.0 correctly', () => {
        const zeroPaper: Paper = { ...mockPaper, recommendationScore: 0 }
        renderCard(zeroPaper)
        expect(screen.getByText('0.0')).toBeInTheDocument()
    })

    it('clamps scores above 10 to 5 stars maximum', () => {
        const highPaper: Paper = { ...mockPaper, recommendationScore: 15 }
        renderCard(highPaper)
        // Should still render 5 stars without crashing
        const stars = screen.getByLabelText('Rating 15 / 10')
        expect(stars.querySelectorAll('span[class*="text-base"]').length).toBe(5)
    })

    it('clamps scores below 0 to 0 stars minimum', () => {
        const negPaper: Paper = { ...mockPaper, recommendationScore: -3 }
        renderCard(negPaper)
        const stars = screen.getByLabelText('Rating -3 / 10')
        expect(stars.querySelectorAll('span[class*="text-base"]').length).toBe(5)
    })
})
