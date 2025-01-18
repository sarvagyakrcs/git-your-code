"use client"
import React from 'react'
import AnswerDialogue from './answer-dialogue';
import { askQuestion } from '@/actions/ask-question';
import { set } from 'date-fns';
import { readStreamableValue } from 'ai/rsc';


const AskAQuestion = ({ projectId }: { projectId: string }) => {
    const [question, setQuestion] = React.useState('');
    // for the answer dialogue
    const [open, setOpen] = React.useState(false);
    //loading state
    const [loading, setLoading] = React.useState(false);
    // files references
    const [filesReferences, setFilesReferences] = React.useState<{ fileName: string, sourceCode: string, summary: string }[]>([]);
    // answer
    const [answer, setAnswer] = React.useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!projectId) return;
        setAnswer('');
        setFilesReferences([]);
        e.preventDefault();
        setLoading(true);
        const { filesReferences, stream } = await askQuestion(question, projectId);
        setFilesReferences(filesReferences);
        setOpen(true)

        for await (const data of readStreamableValue(stream)) {
            if (data) {
                setAnswer(answer => answer + data);
            }
        }
        setLoading(false);
    }
    return (
        <div>
            <form onSubmit={onSubmit} className="mt-2">
                <textarea
                    id="comment"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    name="comment"
                    rows={4}
                    className="block w-72 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder='Eg: Which file contains the entry point to the backend ?'
                />
                <div className="flex w-full items-center justify-between">
                    <button
                        type="submit"
                        className="rounded mt-3 bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={loading}
                    >
                        Ask Question
                    </button>
                    {answer && <button
                        type="button"
                        className="rounded mt-3 bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpen(true)}
                    >
                        Last Answer
                    </button>}
                </div>
            </form>

            <AnswerDialogue open={open} setOpen={setOpen} answer={answer} files={filesReferences} />
        </div>
    )
}

export default AskAQuestion