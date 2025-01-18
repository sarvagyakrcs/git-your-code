# GitHub Repository RAG System

A sophisticated Retrieval-Augmented Generation (RAG) system designed to process, analyze, and query GitHub repository content using advanced AI techniques. This system combines document loading, AI-powered summarization, vector embeddings, and intelligent query processing to make repository content more accessible and understandable.

## System Overview

This system implements a comprehensive RAG pipeline that transforms GitHub repository content into queryable, AI-enhanced knowledge. It processes repository files through multiple stages:

1. Document Loading: Extracts files and metadata from GitHub repositories
2. AI Summarization: Creates concise summaries of file contents
3. Vector Embedding: Converts summaries into searchable vector representations
4. Intelligent Querying: Enables natural language queries with contextually relevant responses

## Features

- Direct GitHub repository integration using GithubRepoLoader
- AI-powered document summarization using Gemini AI
- Vector embedding storage in PostgreSQL with pg-vector
- Semantic search capabilities for intelligent document retrieval
- Natural language query processing
- Human-readable response generation

## Technical Architecture

### Document Loading

The system uses the GithubRepoLoader from @langchain/community to extract repository content:

```javascript
import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";

const loader = new GithubRepoLoader({
  repositoryUrl: "https://github.com/username/repository",
  branch: "main",
});
const documents = await loader.load();
```

Each loaded document contains:
- pageContent: The actual file content
- metadata: Source information including file path, repository URL, and branch

### Document Processing Pipeline

1. **Summarization Phase**
   - Processes raw document content through Gemini AI
   - Generates concise, meaningful summaries
   - Preserves key information while reducing content volume

2. **Vector Embedding Phase**
   - Converts summaries into numerical vectors
   - Stores embeddings in PostgreSQL using pg-vector
   - Enables efficient similarity-based searches

3. **Query Processing Phase**
   - Vectorizes user queries
   - Performs similarity searches
   - Retrieves relevant documents
   - Generates contextualized responses

## Usage

### Setting Up the System

1. Configure your database and environment variables
2. Install required dependencies
3. Initialize the vector store
4. Set up the Gemini AI integration

### Querying the System

The system accepts natural language queries and follows this process:

1. Query vectorization
2. Similarity-based document retrieval
3. Context assembly with retrieved documents
4. Response generation using Gemini AI

### Example Query Flow

```markdown
User Query: "How is user role defined in NextAuth?"

System Process:
1. Vectorizes the query
2. Retrieves relevant documents
3. Combines query with document context
4. Generates a human-readable response
```

## System Benefits

- **Scalability**: Efficiently handles large repositories and documentation sets
- **Accuracy**: Leverages advanced AI models for precise information retrieval
- **Usability**: Provides natural language interface for technical content
- **Flexibility**: Adapts to various use cases and repository types

## Technical Requirements

- PostgreSQL database with pg-vector extension
- Node.js environment
- Access to Gemini AI API
- GitHub API access tokens (for repository access)

## Future Enhancements

Potential areas for system expansion:

- Real-time repository updates processing
- Enhanced metadata extraction and utilization
- Multi-repository correlation capabilities
- Custom embedding model integration options
- Advanced query optimization features

## Contributing

Contributions to improve the system are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description
