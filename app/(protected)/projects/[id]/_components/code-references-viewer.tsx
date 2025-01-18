"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
    files: { fileName: string; sourceCode: string; summary: string }[]
}

const CodeReferencesViewer = ({ files }: Props) => {
    const [activeTab, setActiveTab] = React.useState(files[0]?.fileName || '')

    if (files.length === 0) return null

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-5">
            <TabsList className="bg-muted p-1 rounded-md mb-2">
                {files.map((file) => (
                    <TabsTrigger
                        key={file.fileName}
                        value={file.fileName}
                        className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                    >
                        {file.fileName}
                    </TabsTrigger>
                ))}
            </TabsList>
            {files.map((file) => (
                <TabsContent key={file.fileName} value={file.fileName}>
                    <ScrollArea className="h-[40vh] w-full rounded-md border">
                        <SyntaxHighlighter
                            language="typescript"
                            style={atomDark}
                            customStyle={{ margin: 0, borderRadius: '0.375rem' }}
                        >
                            {file.sourceCode.replace(/\\n/g, '\n')}
                        </SyntaxHighlighter>
                    </ScrollArea>
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default CodeReferencesViewer
