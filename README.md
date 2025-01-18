# Git Your Code: Advanced Semantic Repository Analysis System

Git Your Code implements a cutting-edge Retrieval-Augmented Generation (RAG) architecture designed for deep semantic analysis of GitHub repositories. The system leverages vector embeddings, natural language processing, and machine learning to provide intelligent code comprehension and query capabilities.

[![Watch the demo](https://github.com/sarvagyakrcs/git-your-code/blob/main/demo/thumbnail.png)](https://github.com/sarvagyakrcs/git-your-code/blob/7dc29f0b328e61a61ceb84a957a1074128a49ba9/demo/Saving%20Answer%20Demo%201.mov)



## Technical Architecture Overview

### Vector Processing Engine
![Vector Query Processing](https://github.com/sarvagyakrcs/git-your-code/blob/main/demo/rag-architecture.png)
*The system employs sophisticated vector query processing utilizing cosine similarity metrics for precise document retrieval. The implementation leverages SQL with vector operations, maintaining a similarity threshold of 0.5 for optimal precision-recall balance.*

### Document Pipeline Architecture
![Document Processing Pipeline](https://github.com/sarvagyakrcs/git-your-code/blob/main/demo/document-processing-pipeline.png)
*The scalable document processing pipeline demonstrates integration with GitHub's API infrastructure, managing repository indexing, document processing, and embedding generation through an event-driven architecture.*

### Persistence Layer
![Vector Database Structure](https://github.com/sarvagyakrcs/git-your-code/blob/7dc29f0b328e61a61ceb84a957a1074128a49ba9/demo/source-code-embeddings-in-pg-vector.png)
*PostgreSQL-based vector store implementation showcasing the high-dimensional embedding space. The system utilizes pg_vector for efficient similarity computations through Hierarchical Navigable Small World (HNSW) indexing.*

## Core System Components

### Vector Embedding Engine

The system implements a sophisticated vector embedding pipeline utilizing transformer-based architectures for semantic encoding:

```typescript
export const generateEmbeddings = async (docs: Document[]): Promise<EmbeddingVector[]> => {
    return await Promise.all(docs.map(async (doc) => {
        const summary = await summarizeCodeByAI(doc);
        const embedding = await generateVectorEmbeddings(summary || doc.pageContent);
        return {
            summary,
            embedding,
            sourceCode: JSON.stringify(doc.pageContent),
            filename: doc.metadata.source,
        };
    }));
};
```

### Query Processing

The query processing system implements a sophisticated vector similarity search with configurable thresholds:

```typescript
const result = await prisma.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS CosineSimilarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
    ORDER BY CosineSimilarity DESC
    LIMIT 10
`;
```

## Prompt Templates

### Code Analysis Template
The system employs a sophisticated template hierarchy for code analysis:

```typescript
export const GetCodeSummarizePrompt = (doc: Document): string[] => {
    const code = doc.pageContent.slice(0, 10000);
    return [
        'You are an intelligent senior software engineer specializing in onboarding junior software engineers onto projects',
        `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file`,
        'Here is the code:',
        '---',
        `${code}`,
        '---',
        'Give a summary no more than 100 words of the code above'
    ];
};
```

This template implements a pedagogical approach to code explanation, positioning the AI system as an experienced mentor facilitating knowledge transfer to junior developers.

### Differential Analysis Template
The system includes a comprehensive template for git differential analysis:

```typescript
export const GetDiffSummarizePrompt = (diff: string): string => {
    return `
    # Git Commit Summary Prompt
    Analyze the provided git diff and create a structured summary following these guidelines:
    
    1. High-Level Changes
    2. Core Features (✨ New Features)
    3. Schema Changes (🗃️ Database)
    4. Dependencies (📦 Dependencies)
    5. Infrastructure (🛠️ Infrastructure)
    ...`;
};
```

### Contextual Query Template
The system implements a sophisticated context-aware query processing template:

```typescript
export function GetAskAQuestionPrompt({ context, question }: PromptParams): string {
    return `You are an AI code assistant who answers questions about the codebase...
    ${context ? `START CONTEXT BLOCK\n${context}\nEND OF CONTEXT BLOCK\n` : ''}
    ${question ? `START QUESTION\n${question}\nEND OF QUESTION\n` : ''}`;
}
```

## System Architecture Components

### Document Processing Pipeline

The system implements a sophisticated document processing pipeline:

1. **Repository Ingestion**
   - GithubRepoLoader integration for systematic content extraction
   - Metadata preservation and provenance tracking
   - Rate-limited API interaction management

2. **Document Vectorization**
   - Transformer-based embedding generation
   - Dimensional reduction for optimization
   - Efficient vector storage and indexing

3. **Query Processing**
   - Vector similarity computation
   - Context window assembly
   - Response generation orchestration

### Database Schema

The system utilizes a sophisticated PostgreSQL schema with vector extensions:

```sql
CREATE TABLE "SourceCodeEmbedding" (
    id TEXT PRIMARY KEY,
    fileName TEXT NOT NULL,
    sourceCode TEXT NOT NULL,
    summary TEXT,
    summaryEmbedding vector(1536)
);

CREATE INDEX embedding_idx ON "SourceCodeEmbedding" 
USING ivfflat (summaryEmbedding vector_cosine_ops)
WITH (lists = 100);
```