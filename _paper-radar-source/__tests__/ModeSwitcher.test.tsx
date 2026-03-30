import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModeSwitcher from '@/components/ModeSwitcher'
import { LanguageProvider } from '@/contexts/LanguageContext'

function renderModeSwitcher(
    props: {
        currentMode?: 'expert' | 'general' | 'lazy'
        onChange?: jest.Mock
        variant?: 'global' | 'card'
    } = {}
) {
    const { currentMode = 'general', onChange = jest.fn(), variant } = props
    return render(
        <LanguageProvider>
            <ModeSwitcher currentMode={currentMode} onChange={onChange} variant={variant} />
        </LanguageProvider>
    )
}

describe('ModeSwitcher rendering', () => {
    it('renders three mode buttons', () => {
        renderModeSwitcher()
        // Chinese labels by default
        expect(screen.getByText('专业版')).toBeInTheDocument()
        expect(screen.getByText('通用版')).toBeInTheDocument()
        expect(screen.getByText('懒人版')).toBeInTheDocument()
    })

    it('renders all three emojis', () => {
        renderModeSwitcher()
        expect(screen.getByText('🎓')).toBeInTheDocument()
        expect(screen.getByText('📖')).toBeInTheDocument()
        expect(screen.getByText('⚡')).toBeInTheDocument()
    })

    it('applies active styling to the current mode button', () => {
        renderModeSwitcher({ currentMode: 'expert' })
        const expertButton = screen.getByText('专业版').closest('button')!
        expect(expertButton.className).toContain('bg-[#c0392b]')
        expect(expertButton.className).toContain('text-white')
    })

    it('does not apply active styling to inactive buttons', () => {
        renderModeSwitcher({ currentMode: 'expert' })
        const generalButton = screen.getByText('通用版').closest('button')!
        expect(generalButton.className).not.toContain('bg-[#c0392b] text-white')
    })

    it('renders with default card variant when no variant prop is given', () => {
        const { container } = renderModeSwitcher()
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper.className).toContain('bg-[#f5f5f3]')
    })

    it('renders with global variant styling when variant="global"', () => {
        const { container } = renderModeSwitcher({ variant: 'global' })
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper.className).toContain('bg-white')
        expect(wrapper.className).toContain('shadow-sm')
    })
})

describe('ModeSwitcher interactions', () => {
    it('calls onChange with "expert" when the Expert button is clicked', async () => {
        const user = userEvent.setup()
        const onChange = jest.fn()
        renderModeSwitcher({ currentMode: 'general', onChange })
        await user.click(screen.getByText('专业版'))
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith('expert')
    })

    it('calls onChange with "lazy" when the Lazy button is clicked', async () => {
        const user = userEvent.setup()
        const onChange = jest.fn()
        renderModeSwitcher({ currentMode: 'general', onChange })
        await user.click(screen.getByText('懒人版'))
        expect(onChange).toHaveBeenCalledWith('lazy')
    })

    it('calls onChange with "general" when the General button is clicked', async () => {
        const user = userEvent.setup()
        const onChange = jest.fn()
        renderModeSwitcher({ currentMode: 'expert', onChange })
        await user.click(screen.getByText('通用版'))
        expect(onChange).toHaveBeenCalledWith('general')
    })
})

describe('ModeSwitcher language support', () => {
    it('shows English labels when language is set to "en"', async () => {
        // Render with localStorage set to 'en'
        localStorage.setItem('language', 'en')
        renderModeSwitcher()
        expect(screen.getByText('Expert')).toBeInTheDocument()
        expect(screen.getByText('General')).toBeInTheDocument()
        expect(screen.getByText('Lazy')).toBeInTheDocument()
        localStorage.clear()
    })

    it('shows Chinese labels when language is set to "zh"', () => {
        localStorage.setItem('language', 'zh')
        renderModeSwitcher()
        expect(screen.getByText('专业版')).toBeInTheDocument()
        expect(screen.getByText('通用版')).toBeInTheDocument()
        expect(screen.getByText('懒人版')).toBeInTheDocument()
        localStorage.clear()
    })
})
