'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import UserButton from '@/components/auth/user-button/user-button-client'
import { Session } from 'next-auth'
import { Plus } from 'lucide-react'
import { Project } from '@prisma/client'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Dashboard', href: '/home', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Create Project', href: '/create', icon: Plus, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function SidebarLayout({ children, session, projects }: { children: React.ReactNode, session: Session, projects: Project[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentProjectId, setCurrentProjectId] = useState<string | "">("");
    const pathname = usePathname()
    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => {
                                                    const isActive = pathname === item.href
                                                    return (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    isActive
                                                                        ? 'bg-gray-800 text-white'
                                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                                )}
                                                            >
                                                                <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="text-xs/6 font-semibold text-gray-400">Your Projects</div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {projects.map((project) => {
                                                    const isActive = pathname.split('/')[pathname.split('/').length - 1] === project.id;
                                                    return (<li key={project.name}>
                                                        {projects.length == 0 && (
                                                            <li>
                                                                <a
                                                                    href="/create"
                                                                    className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                                                >
                                                                    <Plus aria-hidden="true" className="size-6 shrink-0" />
                                                                    Create Project
                                                                </a>
                                                            </li>
                                                        )}
                                                        <a
                                                            href={`/projects/${project.id}`}
                                                            onClick={() => setCurrentProjectId(project.id)}
                                                            className={classNames(
                                                                isActive
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                            )}
                                                        >
                                                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                                {project.name.split("")[0]}
                                                            </span>
                                                            <span className="truncate">{project.name}</span>
                                                        </a>
                                                    </li>)
                                                })}
                                            </ul>
                                        </li>
                                        <li className="mt-auto">
                                            <a
                                                href="#"
                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                            >
                                                <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => {
                                            const isActive = pathname === item.href
                                            return (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            isActive
                                                                ? 'bg-gray-800 text-white'
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                        )}
                                                    >
                                                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li>
                                    <div className="text-xs/6 font-semibold text-gray-400">Your Projects</div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {projects.length == 0 && (
                                            <li>
                                                <a
                                                    href="/create"
                                                    className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                                >
                                                    <Plus aria-hidden="true" className="size-6 shrink-0" />
                                                    Create Project
                                                </a>
                                            </li>
                                        )}
                                        {projects.map((project) => {
                                            const isActive = pathname.split('/')[pathname.split('/').length - 1] === project.id;
                                            return (<li key={project.name}>
                                                <a
                                                    href={`/projects/${project.id}`}
                                                    onClick={() => setCurrentProjectId(project.id)}
                                                    className={classNames(
                                                        'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <span className={
                                                        cn(
                                                            'text-[0.625rem] font-medium rounded-lg border border-gray-700 flex size-6 shrink-0 items-center justify-center',
                                                            isActive
                                                                ? 'bg-primary text-white'
                                                                : 'text-gray-400 group-hover:text-white'
                                                        )                                                        
                                                    }>
                                                        {project.name.split("")[0]}
                                                    </span>
                                                    <span className="truncate">{project.name}</span>
                                                </a>
                                            </li>
                                        )})}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <a
                                        href="#"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                    >
                                        <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                        Settings
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                                <input
                                    name="search"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                                />
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>

                                {/* Separator */}
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                                {/* Profile dropdown */}
                                <UserButton session={session} />
                            </div>
                        </div>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    )
}

