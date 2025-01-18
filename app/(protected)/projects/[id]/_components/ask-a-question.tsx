"use client"
import React from 'react'
import AnswerDialogue from './answer-dialogue';


const AskAQuestion = () => {
    const [question, setQuestion] = React.useState('');
    // for the answer dialogue
    const [open, setOpen] = React.useState(false)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(true)
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
                <button
                    type="submit"
                    className="rounded mt-3 bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Ask Question
                </button>
            </form>
            <AnswerDialogue open={open} setOpen={setOpen} />
        </div>
    )
}

export default AskAQuestion