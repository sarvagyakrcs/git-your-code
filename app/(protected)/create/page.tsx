"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CreateProjectForm from "./_components/create-project-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Example() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-primary-foreground">
              <CardTitle className="text-3xl font-bold text-center text-primary">Create New Project</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CreateProjectForm setIsLoading={setIsLoading} />
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="hidden xl:block w-96 bg-card border-l border-border p-8 overflow-y-auto"
      >
        <h2 className="text-2xl font-semibold mb-4 text-primary">Project Information</h2>
        <p className="text-muted-foreground">
          Create a new project by providing the necessary details. Make sure to use a unique project name and a valid
          GitHub repository URL.
        </p>
      </motion.aside>
    </div>
  )
}

