'use client'

import React from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronRight, Copy, MoreVertical, GitCommit, CheckCircle2, GitBranch, Users, Clock, Check, X } from 'lucide-react'
import { format } from 'date-fns'
import { Commit } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    commits: Commit[]
}

const CommitLog = ({ commits }: Props) => {
    // Group commits by date
    const groupedCommits = commits.reduce((groups, commit) => {
        const date = format(commit.createdAt, 'MMM d, yyyy')
        if (!groups[date]) {
            groups[date] = []
        }
        groups[date].push(commit)
        return groups
    }, {} as Record<string, Commit[]>)

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text)
    }

    return (
        <div className="w-full bg-white border rounded-3xl mt-8 p-6 bg-res shadow-sm">
            <div className="border-b border-gray-200 pb-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Commits</h1>
                </div>
            </div>

            <div className="mt-4">
                {Object.entries(groupedCommits).map(([date, dateCommits]) => (
                    <div key={date} className="mb-8">
                        <div className="mb-3 text-sm text-gray-500">Commits on {date}</div>
                        <div className="relative">
                            <div className="absolute left-[27px] top-0 h-full w-px bg-gray-200" />
                            <div className="space-y-4">
                                {dateCommits.map((commit) => (
                                    <Disclosure key={commit.id}>
                                        {({ open }) => (
                                            <div className="relative">
                                                <div className={`absolute left-[21px] top-4 h-3 w-3 rounded-full border-2 ${commit.summary === null ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                                                    }`} />
                                                <div className="pl-12">
                                                    <div className="rounded-lg border border-gray-200 bg-white">
                                                        <div className="flex items-center px-4 py-2.5">
                                                            <div className="flex min-w-0 flex-1 items-center gap-3">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={commit.commitAuthorAvatar} />
                                                                    <AvatarFallback>{commit.commitAuthorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                                </Avatar>

                                                                <div className="min-w-0 flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="font-semibold text-gray-900">
                                                                            {commit.commitMessage.split('\n')[0]}
                                                                        </span>
                                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 border border-green-200">
                                                                            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                                                            Verified
                                                                        </span>
                                                                    </div>
                                                                    <div className="mt-0.5 flex items-center gap-1 text-[13px] text-gray-500">
                                                                        <span className="font-medium text-gray-700">{commit.commitAuthorName}</span>
                                                                        <span>authored</span>
                                                                        <span>on</span>
                                                                        <time dateTime={commit.createdAt.toISOString()}>
                                                                            {format(commit.createdAt, 'MMM d, yyyy')}
                                                                        </time>
                                                                        <span className={`flex items-center gap-1 ml-2 ${commit.summary === null ? 'text-red-600' : ''
                                                                            }`}>
                                                                            {commit.summary ? (
                                                                                <Check className="h-3.5 w-3.5 text-green-600" />
                                                                            ) : (
                                                                                <X className="h-3.5 w-3.5 text-red-600" />
                                                                            )}
                                                                            <span className={commit.summary === null ? 'text-red-600' : ''}>
                                                                                {commit.summary ? '1/1' : '0/1'}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2 ml-4">
                                                                <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                                                                    <GitCommit className="h-3.5 w-3.5" />
                                                                    <code>{commit.commitHash.slice(0, 7)}</code>
                                                                </div>

                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-gray-500"
                                                                    onClick={() => copyToClipboard(commit.commitHash)}
                                                                >
                                                                    <Copy className="h-4 w-4" />
                                                                    <span className="sr-only">Copy commit hash</span>
                                                                </Button>

                                                                <Disclosure.Button className="rounded-md p-1 hover:bg-gray-100">
                                                                    <ChevronRight
                                                                        className={`h-5 w-5 text-gray-400 transition-transform ${open ? 'rotate-90 transform' : ''
                                                                            }`}
                                                                    />
                                                                </Disclosure.Button>

                                                                <Menu as="div" className="relative">
                                                                    <Menu.Button className="rounded-md p-1 hover:bg-gray-100">
                                                                        <MoreVertical className="h-5 w-5 text-gray-400" />
                                                                    </Menu.Button>
                                                                    <Transition
                                                                        as={React.Fragment}
                                                                        enter="transition ease-out duration-100"
                                                                        enterFrom="transform opacity-0 scale-95"
                                                                        enterTo="transform opacity-100 scale-100"
                                                                        leave="transition ease-in duration-75"
                                                                        leaveFrom="transform opacity-100 scale-100"
                                                                        leaveTo="transform opacity-0 scale-95"
                                                                    >
                                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={() => copyToClipboard(commit.commitHash)}
                                                                                            className={`${active ? 'bg-gray-50' : ''
                                                                                                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                                                        >
                                                                                            Copy commit SHA
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                        </Menu.Items>
                                                                    </Transition>
                                                                </Menu>
                                                            </div>
                                                        </div>

                                                        <Disclosure.Panel className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                                                            <div className="space-y-4 text-sm">
                                                                {commit.summary && (
                                                                    <div className="prose prose-sm max-w-none text-gray-600">
                                                                        <p className="whitespace-pre-wrap font-medium text-gray-900">
                                                                            {commit.summary}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommitLog

