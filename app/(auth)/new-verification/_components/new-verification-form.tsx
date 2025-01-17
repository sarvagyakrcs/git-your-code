"use client"

import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PROJECT_NAME } from '@/metadata'
import { newVerification } from '@/actions/auth/new-verification'
import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react'
import Link from 'next/link'

const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Token Does Not Exist")
      setLoading(false)
      return
    }
    try {
      const res = await newVerification(token)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(res.success)
      }
    } catch {
      setError("Something Went Wrong")
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Suspense fallback={"loading"}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-primary text-primary-foreground p-4 shadow-sm">
          <div className="container mx-auto flex items-center">
            <h1 className="text-xl font-semibold">{PROJECT_NAME}</h1>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-background border border-border rounded-lg shadow-sm">
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6 text-center">
                {loading ? "Verifying your account" : "Account verification"}
              </h2>
              <div className="text-center">
                {loading ? (
                  <div className="animate-pulse flex flex-col items-center space-y-4">
                    <div className="rounded-full bg-muted h-16 w-16"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ) : success ? (
                  <div className="text-success flex items-center justify-center space-x-2">
                    <CheckCircleFillIcon size={24} />
                    <span className="text-lg font-medium">{success}</span>
                  </div>
                ) : (
                  <div className="text-destructive flex items-center justify-center space-x-2">
                    <XCircleFillIcon size={24} />
                    <span className="text-lg font-medium">{error}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-muted px-6 py-4 sm:px-10 sm:py-6 border-t border-border rounded-b-lg flex justify-between items-center flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} {PROJECT_NAME}. All rights reserved.
              </p>
              <Link
                href="/"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  )
}

export default NewVerificationForm