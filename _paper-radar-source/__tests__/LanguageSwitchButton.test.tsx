import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSwitchButton from '@/components/LanguageSwitchButton'
import { LanguageProvider } from '@/contexts/LanguageContext'

function renderButton() {
    return render(
        <LanguageProvider>
            <LanguageSwitchButton />
        </LanguageProvider>
    )
}

beforeEach(() => {
    localStorage.clear()
})

describe('LanguageSwitchButton rendering', () => {
    it('renders a button element', () => {
        renderButton()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('shows "EN" label when current language is zh (default)', () => {
        renderButton()
        expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('shows "中" label when current language is en', () => {
        localStorage.setItem('language', 'en')
        renderButton()
        expect(screen.getByText('中')).toBeInTheDocument()
    })

    it('has a globe emoji', () => {
        renderButton()
        expect(screen.getByText('🌐')).toBeInTheDocument()
    })

    it('has correct aria-label when language is zh (switching to English)', () => {
        renderButton()
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to English')
    })

    it('has correct aria-label when language is en (switching to Chinese)', () => {
        localStorage.setItem('language', 'en')
        renderButton()
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to 中文')
    })
})

describe('LanguageSwitchButton interactions', () => {
    it('toggles from zh to en when clicked', async () => {
        const user = userEvent.setup()
        renderButton()
        expect(screen.getByText('EN')).toBeInTheDocument()
        await user.click(screen.getByRole('button'))
        expect(screen.getByText('中')).toBeInTheDocument()
    })

    it('toggles from en to zh when clicked', async () => {
        const user = userEvent.setup()
        localStorage.setItem('language', 'en')
        renderButton()
        expect(screen.getByText('中')).toBeInTheDocument()
        await user.click(screen.getByRole('button'))
        expect(screen.getByText('EN')).toBeInTheDocument()
    })

    it('persists the toggled language to localStorage', async () => {
        const user = userEvent.setup()
        renderButton()
        await user.click(screen.getByRole('button'))
        expect(localStorage.getItem('language')).toBe('en')
    })

    it('updates aria-label after toggling', async () => {
        const user = userEvent.setup()
        renderButton()
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-label', 'Switch to English')
        await user.click(button)
        expect(button).toHaveAttribute('aria-label', 'Switch to 中文')
    })
})
