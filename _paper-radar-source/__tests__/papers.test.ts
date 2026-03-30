import { getSummaryText, papers, generatedYear, generatedDateLabel, totalFilteredCount } from '@/data/papers'
import type { SummaryContent, Paper, SummaryMode } from '@/data/papers'

describe('getSummaryText', () => {
    it('returns the string directly when summary is a plain string', () => {
        const summary: SummaryContent = 'A plain text summary'
        expect(getSummaryText(summary, 'zh')).toBe('A plain text summary')
        expect(getSummaryText(summary, 'en')).toBe('A plain text summary')
    })

    it('returns the zh value for zh language', () => {
        const summary: SummaryContent = { zh: '中文摘要', en: 'English summary' }
        expect(getSummaryText(summary, 'zh')).toBe('中文摘要')
    })

    it('returns the en value for en language', () => {
        const summary: SummaryContent = { zh: '中文摘要', en: 'English summary' }
        expect(getSummaryText(summary, 'en')).toBe('English summary')
    })

    it('falls back to zh when en is missing', () => {
        const summary = { zh: '中文摘要', en: '' } as SummaryContent
        // getSummaryText returns '' (en is falsy), then falls back to zh
        expect(getSummaryText(summary, 'en')).toBe('中文摘要')
    })

    it('falls back to en when zh is missing', () => {
        const summary = { zh: '', en: 'English summary' } as SummaryContent
        // getSummaryText returns '' (zh is falsy), then falls back to en
        expect(getSummaryText(summary, 'zh')).toBe('English summary')
    })
})

describe('papers data', () => {
    it('exports a non-empty array of papers', () => {
        expect(Array.isArray(papers)).toBe(true)
        expect(papers.length).toBeGreaterThan(0)
    })

    it('every paper has the required fields', () => {
        const modes: SummaryMode[] = ['expert', 'general', 'lazy']
        for (const paper of papers) {
            expect(typeof paper.id).toBe('string')
            expect(paper.id.length).toBeGreaterThan(0)

            expect(typeof paper.title).toBe('string')
            expect(paper.title.length).toBeGreaterThan(0)

            expect(typeof paper.authors).toBe('string')
            expect(paper.authors.length).toBeGreaterThan(0)

            expect(typeof paper.year).toBe('string')
            expect(paper.year.length).toBeGreaterThan(0)

            expect(typeof paper.arxivUrl).toBe('string')
            expect(paper.arxivUrl).toMatch(/^https?:\/\//)

            expect(typeof paper.recommendationScore).toBe('number')
            expect(paper.recommendationScore).toBeGreaterThanOrEqual(0)
            expect(paper.recommendationScore).toBeLessThanOrEqual(10)

            expect(paper.summaries).toBeDefined()
            for (const mode of modes) {
                expect(paper.summaries[mode]).toBeDefined()
            }
        }
    })

    it('every paper has a valid ArXiv URL', () => {
        for (const paper of papers) {
            expect(paper.arxivUrl).toMatch(/^https:\/\/arxiv\.org\/abs\//)
        }
    })

    it('paper ids are unique', () => {
        const ids = papers.map((p) => p.id)
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(ids.length)
    })

    it('every paper summary provides getSummaryText output for both languages', () => {
        const modes: SummaryMode[] = ['expert', 'general', 'lazy']
        for (const paper of papers) {
            for (const mode of modes) {
                const zh = getSummaryText(paper.summaries[mode], 'zh')
                const en = getSummaryText(paper.summaries[mode], 'en')
                expect(typeof zh).toBe('string')
                expect(typeof en).toBe('string')
                // At least one language should have non-empty content
                expect(zh.length + en.length).toBeGreaterThan(0)
            }
        }
    })
})

describe('module-level constants', () => {
    it('generatedYear is a 4-digit year string', () => {
        expect(generatedYear).toMatch(/^\d{4}$/)
    })

    it('generatedDateLabel is a non-empty string', () => {
        expect(typeof generatedDateLabel).toBe('string')
        expect(generatedDateLabel.length).toBeGreaterThan(0)
    })

    it('totalFilteredCount is a positive number', () => {
        expect(typeof totalFilteredCount).toBe('number')
        expect(totalFilteredCount).toBeGreaterThan(0)
        // totalFilteredCount should be >= the selected papers count
        expect(totalFilteredCount).toBeGreaterThanOrEqual(papers.length)
    })
})
