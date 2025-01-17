"use client"
import React from 'react'
import QueryClientProvider from './query-client-provider'
import { ThemeProvider } from './theme-provider'

type Props = {
    children: React.ReactNode
}

const GlobalProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider>
            {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        > */}

            {children}
            {/* </ThemeProvider> */}
        </QueryClientProvider>
    )
}

export default GlobalProvider