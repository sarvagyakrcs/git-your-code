"use client"

import { GetSavedQuestions } from '@/actions/save-question'
import SomethingWentWrongPage from '@/components/pages/something-went-wrong-page'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import SavedQuestionDrawer from './_components/drawer'
import { Transition } from '@headlessui/react'
import { Question } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'
import { beautifyQuestion } from '@/utils/format-strings'

interface QuestionCardProps {
    question: Question
    onClick: () => void
}

export default function SavedAnswers() {
    const [open, setOpen] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState<string | undefined>(undefined)

    const { data: savedQuestions, isPending, isError } = useQuery({
        queryKey: ['getSavedQuestions'],
        queryFn: GetSavedQuestions,
    })

    if (isError) return <SomethingWentWrongPage />

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Saved Answers</h1>
            <Transition
                show={true}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isPending
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                        : savedQuestions?.map((question) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                onClick={() => {
                                    setOpen(true)
                                    setSelectedQuestion(question.id)
                                }}
                            />
                        ))}
                </div>
            </Transition>
            <SavedQuestionDrawer
                open={open}
                setOpen={setOpen}
                question={savedQuestions?.find((question) => question.id === selectedQuestion)}
            />
        </div>
    )
}

function QuestionCard({ question, onClick }: QuestionCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
            onClick={onClick}
        >
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white line-clamp-2">{beautifyQuestion(question.question)}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Created {formatDistanceToNow(new Date(question.createdAt))} ago
                </p>
            </div>
        </motion.div>
    )
}

function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    )
}
