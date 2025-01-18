'use client'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

type AnswerDialogueProps = {
    open: boolean
    setOpen: (open: boolean) => void
    answer: string
    files: { fileName: string, sourceCode: string, summary: string }[]
}

export default function AnswerDialogue({ open, setOpen, files, answer } : AnswerDialogueProps) {
    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4  text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="mx-10 relative transform overflow-scroll rounded-lg bg-white p-20 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        {/* <pre>{ JSON.stringify(files, null, 2) }</pre> */}
                        { answer }
                        {files.map((file, index) => (
                            <p key={index}>{file.fileName}</p>
                        ))}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
