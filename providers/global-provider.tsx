"use client"
import React from 'react'
import QueryClientProvider from './query-client-provider'
import { ThemeProvider } from './theme-provider'

type Props = {
    children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >

            <QueryClientProvider>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default GlobalProvider