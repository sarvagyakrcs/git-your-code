'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import CreateProjectForm from './_components/create-project-form'
import Image from 'next/image'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                <main className="">
                    <div className="">
                        <div className=" w-ful h-full py-10 sm:px-6 lg:px-8 lg:py-6 flex items">
                            <div className="flex-1">
                                <CreateProjectForm />
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="fixed inset-y-0 right-0 hidden w-96 bg-emerald-500 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                    
                </aside>
            </div>
        </>
    )
}
