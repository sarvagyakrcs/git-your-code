import { Document } from "@langchain/core/documents"

export const GetDiffSummarizePrompt = (diff: string) => {
    return `
    # Git Commit Summary Prompt

    Analyze the provided git diff and create a structured summary following these guidelines:

    code diff : ${diff}

    ## Summary Format

    1. **High-Level Changes**
        - Start with a brief 1-2 sentence overview of the main changes
        - Focus on the business/user impact rather than technical details
        - Use present tense and active voice

    2. **Core Features** (✨ New Features)
        - List major new features or functionality additions
        - Format: - Added [feature] to [purpose/benefit]
        - Include only substantial additions, not minor tweaks

    3. **Schema Changes** (🗃️ Database)
        - List all changes to database schema (new tables, modified columns)
        - Format: - Added/Modified [table_name]: [brief description of change]
        - Include foreign key relationships and indexes

    4. **Dependencies** (📦 Dependencies)
        - List added or updated packages/libraries
        - Format: - Added/Updated [package_name]@[version]: [purpose]
        - Only include direct dependencies, not sub-dependencies

    5. **Infrastructure** (🛠️ Infrastructure)
        - List changes to configuration files, build setup, deployment
        - Format: - Modified [file]: [what changed and why]
        - Include changes to .gitignore, environment setup, etc.

    ## Example Output

    Implements user visit tracking functionality across course pages with analytics capabilities.

    ✨ New Features:
    - Added visit tracking to course pages to capture user engagement metrics
    - Added "Last Visited Courses" component showing recent course activity
    - Implemented visit duration tracking using client-side hooks

    🗃️ Database:
    - Added UserVisit table: Tracks course visits with duration, device, location
    - Added relations: User->UserVisit and Course->UserVisit with cascade delete
    - Added index on [userId, courseId] for visit queries

    📦 Dependencies:
    - Added axios@1.7.7: For client-side API requests
    - Updated Next.js configuration for API routes

    🛠️ Infrastructure:
    - Added /api/visit route for tracking visit data
    - Updated .gitignore to exclude certificates directory

    ## Guidelines for Writing

    1. **Clarity**: Use clear, concise language focused on the impact of changes
    2. **Completeness**: Include all significant changes but avoid minor details
    3. **Context**: Provide enough context to understand why changes were made
    4. **Consistency**: Follow the specified format and emojis for each section
    5. **Relevance**: Skip sections if there are no relevant changes to report

    ## Filtering Rules

    - Exclude changes to whitespace, formatting, or comments
    - Exclude auto-generated files (like lockfiles) unless specifically relevant
    - Exclude temporary or debug code changes
    - Focus on changes that affect functionality, performance, or user experience
`
}

export const GetCodeSummarizePrompt = (doc: Document): string[] => {
    // Limit the code content to 10000 characters to match the image
    const code = doc.pageContent.slice(0, 10000);

    // Return an array of strings that form the complete prompt
    return [
        // Role definition for the AI
        'You are an intelligent senior software engineer who specialises in onboarding junior software engineers onto projects',

        // Task definition referencing the specific file being analyzed
        `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file`,

        // Introduce the code section
        'Here is the code:',

        // Code block delimiter
        '---',

        // The actual code to be analyzed
        `${code}`,

        // Code block delimiter
        '---',

        // The specific task request
        'Give a summary no more than 100 words of the code above'
    ];
};