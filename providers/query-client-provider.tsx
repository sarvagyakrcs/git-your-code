"use client"
import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'

type Props = {
    children: React.ReactNode
}

const QueryClientProvider = ({ children }: Props) => {
    const queryClient = new QueryClient()
    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools /> */}
        </ReactQueryClientProvider>
    )
}

export default QueryClientProvider