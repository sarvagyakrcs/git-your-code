import { Document } from "@langchain/core/documents";

/**
 * Generates a detailed prompt for summarizing a Git diff.
 * 
 * @param {string} diff - The Git diff string to analyze and summarize.
 * @returns {string} A structured prompt string for summarizing the Git diff.
 */
export const GetDiffSummarizePrompt = (diff: string): string => {
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
`;
};

/**
 * Generates a prompt for summarizing a code file for onboarding purposes.
 * 
 * @param {Document} doc - The document object containing the code and metadata.
 * @returns {string[]} An array of strings forming the complete prompt for summarizing the code.
 */
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

/**
 * Parameters for creating a custom question prompt.
 * 
 * @typedef {Object} PromptParams
 * @property {string} [context] - Optional context block to provide additional information.
 * @property {string} [question] - Optional question to ask about the codebase.
 */

/**
 * Generates a prompt for asking a question about a codebase.
 * 
 * @param {PromptParams} params - The parameters containing context and/or a question.
 * @returns {string} A structured prompt string for asking the question.
 */

type PromptParams = {
    context?: string; 
    question?: string; 
}

export function GetAskAQuestionPrompt({ context, question }: PromptParams): string {
    return `You are a ai code assistant who answers questions about the codebase. Your target audience is a technical intern who needs help understanding the code.
    AI assistant is a brand new, powerful, human-like artificial intelligence.
    The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    AI is a well-behaved and well-mannered individual.
    AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
    AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic.
    If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions.
    
    ${context ? `START CONTEXT BLOCK\n${context}\nEND OF CONTEXT BLOCK\n` : ''}
    
    ${question ? `START QUESTION\n${question}\nEND OF QUESTION\n` : ''}
    
    AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer."
    AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    AI assistant will not invent anything that is not drawn directly from the context.
    Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering.`;
}
