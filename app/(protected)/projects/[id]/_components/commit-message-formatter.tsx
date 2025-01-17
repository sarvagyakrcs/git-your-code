type CommitSection = {
    emoji: string
    title: string
    items: string[]
}

export function formatCommitMessage(message: string): {
    title: string
    description: string
    sections: CommitSection[]
} {
    const lines = message.split('\n').filter(line => line.trim())
    if (lines.length === 0) return { title: '', description: '', sections: [] }

    const title = lines[0]
    let description = ''
    const sections: CommitSection[] = []

    const sectionMap: Record<string, CommitSection> = {
        'New Features': { emoji: '✨', title: 'New Features', items: [] },
        'Database': { emoji: '🗃️', title: 'Database', items: [] },
        'Dependencies': { emoji: '📦', title: 'Dependencies', items: [] },
        'Infrastructure': { emoji: '🛠️', title: 'Infrastructure', items: [] }
    }

    let currentSection: CommitSection | null = null
    let descriptionLines: string[] = []

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        const sectionMatch = line.match(/^([✨🗃️📦🛠️])\s*(.*?):\s*(.*)/) ||
            line.match(/(New Features|Database|Dependencies|Infrastructure):\s*(.*)/)

        if (sectionMatch) {
            if (descriptionLines.length > 0 && sections.length === 0) {
                description = descriptionLines.join(' ').trim()
                descriptionLines = []
            }

            const sectionKey = sectionMatch[2] || sectionMatch[1]
            currentSection = sectionMap[sectionKey] || { emoji: '📝', title: sectionKey, items: [] }
            sections.push(currentSection)

            const initialContent = sectionMatch[3] || sectionMatch[2]
            if (initialContent && !initialContent.includes('- ')) {
                currentSection.items.push(initialContent.trim())
            }
        } else if (currentSection) {
            if (line.startsWith('- ')) {
                currentSection.items.push(line.slice(2).trim())
            } else if (line.startsWith('  - ')) {
                currentSection.items.push('  ' + line.slice(4).trim())
            } else if (line) {
                currentSection.items.push(line)
            }
        } else {
            descriptionLines.push(line)
        }
    }

    if (descriptionLines.length > 0 && sections.length === 0) {
        description = descriptionLines.join(' ').trim()
    }

    return { title, description, sections: sections.filter(section => section.items.length > 0) }
}

