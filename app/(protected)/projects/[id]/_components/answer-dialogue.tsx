'use client'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import MDEditor from "@uiw/react-md-editor"
import CodeReferencesViewer from './code-references-viewer'
import { FaFloppyDisk } from 'react-icons/fa6'
import { useMutation } from '@tanstack/react-query'
import { SaveQuestion } from '@/actions/save-question'
import { toast } from 'sonner'
import { handleError } from '@/utils/error-logs'
import { IconLoader } from '@tabler/icons-react'

type AnswerDialogueProps = {
    open: boolean
    setOpen: (open: boolean) => void
    answer: string
    files: { fileName: string, sourceCode: string, summary: string }[]
    projectId: string
    question: string
}

export default function AnswerDialogue({ open, setOpen, files, answer, projectId, question }: AnswerDialogueProps) {

    const saveAnswerMutation = useMutation({
        mutationKey: ['saveAnswer'],
        mutationFn: SaveQuestion,
        onMutate: () => {
            toast.loading("Saving answer", { id: "saving-question" })
        },
        onSuccess: () => {
            toast.success("Answer saved successfully", { id: "saving-question" })
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong", { id: "saving-question" })
        }
    })

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-scroll max-h-[95vh] rounded-lg bg-white m-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        {/* <pre>{ JSON.stringify(files, null, 2) }</pre> */}
                        <MDEditor.Markdown source={answer} className='max-w-full p-4 overflow-scroll max-h-[30vh]' />
                        {/* { answer } */}
                        {/* {files.map((file, index) => (
                            <p key={index}>{file.fileName}</p>
                        ))} */}
                        <CodeReferencesViewer files={files} />
                        <div className="mt-5 sm:mt-6 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="inline-flex max-w-sm justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={() => saveAnswerMutation.mutate({
                                    answer: answer,
                                    filesReference: files,
                                    projectId: projectId,
                                    question: question
                                })}
                                className="inline-flex max-w-sm justify-center items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={saveAnswerMutation.isPending}
                            >
                                <span>{saveAnswerMutation.isPending ? "Saving" : "Save"}</span>
                                {saveAnswerMutation.isPending ? <IconLoader className='h-4 w-4 animate-spin' /> : <FaFloppyDisk className='h-4 w-4' />}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
