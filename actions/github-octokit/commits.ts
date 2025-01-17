/**
 * Fetches the commit hashes and details from a GitHub repository.
 *
 * @param {string} githubUrl - The URL of the GitHub repository in the format `https://github.com/{owner}/{repo}`.
 * @returns {Promise<Response[]>} A promise that resolves to an array of commit details, each containing:
 *   - `commitHash` (string): The SHA hash of the commit.
 *   - `commitMessage` (string): The commit message.
 *   - `commitAuthorName` (string): The name of the author of the commit.
 *   - `commitAuthorAvatar` (string): The avatar URL of the author (if available).
 *   - `commitDate` (string): The date of the commit in ISO format.
 * @throws Will throw an error if fetching commits fails.
 *
 * @example
 * const url = "https://github.com/sarvagyakrcs/youdemy";
 * GetCommitHashes(url)
 *   .then(commits => {
 *       console.log('Commits:', commits);
 *   })
 *   .catch(error => console.error('Error:', error));
 */

import { octokit } from "@/lib/github";
import prisma from "@/lib/prisma";
import axios from "axios"
import { summarizeCommitByAI } from "../gemini";

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
};

export const GetCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const [, , , owner, repo] = githubUrl.split('/');

    try {
        const { data } = await octokit.rest.repos.listCommits({
            owner,
            repo,
            per_page: 100, // Fetch up to 100 commits (adjust as needed)
        });

        const commits = data.map(commit => ({
            commitHash: commit.sha,
            commitMessage: commit.commit.message,
            commitAuthorName: commit.commit.author?.name || 'Unknown',
            commitAuthorAvatar: commit.author?.avatar_url || '',
            commitDate: commit.commit.author?.date || '',
        }));

        // Sort commits by date, latest first
        commits.sort((a, b) => new Date(b.commitDate).getTime() - new Date(a.commitDate).getTime());

        return commits;
    } catch (error) {
        console.error('Error fetching commits:', error);
        throw error;
    }
};

export const pollCommit = async (projectId: string) => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })
    if(!project || !project.githubURL) {
        throw new Error("Project not found or GitHub URL not provided");
    }

    const url = project.githubURL;

    const commits = await GetCommitHashes(url);
    const unprocessedCommits = await getUnprocessedCommits(projectId, commits);

    // get ai summary for unprocessed commits
    const summariesResponses = await Promise.allSettled(unprocessedCommits.map(async commit => {
        return summarizeCommit(url, commit.commitHash);
    }))

    const summaries = summariesResponses.map((summary, index) => {
        if(summary.status === "fulfilled") {
            return {
                commitHash: unprocessedCommits[index].commitHash,
                summary: summary.value
            }
        }
        return { commitHash: unprocessedCommits[index].commitHash, summary: "No summary available" };
    })

    const createdCommits = prisma.commit.createMany({
        data: summaries.map((summary, index) => {
            return {
                projectId: projectId,
                commitHash: unprocessedCommits[index].commitHash,
                summary: typeof summary === 'string' ? summary : summary.summary as string,
                commitMessage: unprocessedCommits[index].commitMessage,
                commitAuthorName: unprocessedCommits[index].commitAuthorName,
                commitAuthorAvatar: unprocessedCommits[index].commitAuthorAvatar,
            }
        })
    })
    return createdCommits;
}

export const summarizeCommit = async (githubUrl: string, commitHash: string) => {
    // get diff code from github
    const data =await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
        headers: {
            Accept: "application/vnd.github.v3.diff"
        }
    })
    
    return summarizeCommitByAI(data.data) || "No summary available"; 
}

export const getUnprocessedCommits = async(projectId: string, commits: Response[]) => {
    const processedCommits = await prisma.commit.findMany({
        where: { projectId }
    })

    const unprocessedCommits = commits.filter(commit => {
        return !processedCommits.some(processedCommit => processedCommit.commitHash === commit.commitHash)
    })

    return unprocessedCommits;
}
