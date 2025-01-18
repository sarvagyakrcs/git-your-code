"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { v4 as uuid } from "uuid"

type Props = {
    files: { fileName: string; sourceCode: string; summary: string }[]
}

const CodeReferencesViewer = ({ files }: Props) => {
    const [activeTab, setActiveTab] = React.useState(files[0]?.fileName || '')
    const [copied, setCopied] = React.useState(false)

    if (files.length === 0) return null

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-5">
            <TabsList className="bg-muted p-1 rounded-md mb-2 max-w-full overflow-scroll">
                {files.map((file) => (
                    <TabsTrigger
                        key={uuid()}
                        value={file.fileName}
                        className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                    >
                        {file.fileName}
                    </TabsTrigger>
                ))}
            </TabsList>
            {files.map((file) => (
                <TabsContent key={uuid()} value={file.fileName}>
                    <div className="relative">
                        <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                            onClick={() => copyToClipboard(file.sourceCode.replace(/\\n/g, '\n'))}
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy code
                                </>
                            )}
                        </Button>
                        <ScrollArea className="h-[40vh] w-full rounded-md border">
                            <SyntaxHighlighter
                                language="typescript"
                                style={nightOwl}
                                customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                            >
                                {file.sourceCode.replace(/\\n/g, '\n')}
                            </SyntaxHighlighter>
                        </ScrollArea>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default CodeReferencesViewer
