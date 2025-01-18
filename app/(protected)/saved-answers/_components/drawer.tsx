'use client'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Question } from '@prisma/client'
import { beautifyQuestion } from '@/utils/format-strings'
import MDEditor from '@uiw/react-md-editor'
import CodeReferencesViewer from '../../projects/[id]/_components/code-references-viewer'

export default function SavedQuestionDrawer({ open, setOpen, question }: {
    open: boolean,
    setOpen: (open: boolean) => void
    question: Question | undefined
}) {
    if (question === undefined) return null
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-3xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6 border-b pb-3">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold text-gray-900">
                                            {beautifyQuestion(question.question)} <br />
                                            <span className='text-sm bg-text-muted flex items-center justify-end'>Created : <span className='underline pl-2'>{question.createdAt.toLocaleDateString()}</span></span>
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    <ul role="list" className="space-y-3">
                                            <li className="overflow-hidden min-h-[35vh] rounded-md bg-white px-6 py-4 shadow">
                                                <h3 className='text-lg font-semibold pb-3'>Answer : </h3>
                                                <MDEditor.Markdown source={question.answer} className='min-w-full rounded-lg hover:shadow-xl p-4 overflow-scroll min-h-[35vh]' />
                                            </li>
                                            <li className="overflow-hidden min-h-[40vh] rounded-md bg-white px-6 py-4 shadow">
                                                <h3 className='text-lg font-semibold pb-3'>Code : </h3>
                                                <CodeReferencesViewer files={(question.filesReference ?? []) as any} />
                                            </li>
                                    </ul>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
