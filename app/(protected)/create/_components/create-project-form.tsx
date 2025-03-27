"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateProjectSchema, type CreateProjectSchemaType } from "@/lib/schema/create-project-schema"
import { useMutation } from "@tanstack/react-query"
import { CreateProject } from "@/actions/projects"
import { Loader2, GitBranch, Key, FolderGit2 } from "lucide-react"
import { motion } from "framer-motion"

export default function CreateProjectForm({ setIsLoading }: { setIsLoading: (loading: boolean) => void }) {
  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(CreateProjectSchema),
  })

  const CreateProjectMutation = useMutation({
    mutationKey: ["createProject"],
    mutationFn: CreateProject,
    onMutate: () => {
      setIsLoading(true)
      toast.loading("Creating project", { id: "createProject" })
    },
    onError: () => {
      setIsLoading(false)
      toast.error("Failed to create project. Please try again.", { id: "createProject" })
    },
    onSuccess: () => {
      setIsLoading(false)
      toast.success("Project created successfully", { id: "createProject" })
      form.reset()
    },
  })

  function onSubmit(values: CreateProjectSchemaType) {
    CreateProjectMutation.mutate(values)
  }

  const formFields = [
    {
      name: "projectName",
      label: "Project Name",
      icon: FolderGit2,
      placeholder: "My Awesome Project",
      description: "Choose a unique name for your project",
    },
    {
      name: "repoURL",
      label: "GitHub Repository URL",
      icon: GitBranch,
      placeholder: "https://github.com/username/repository.git",
      description: "The URL of your GitHub repository",
    },
    {
      name: "githubToken",
      label: "GitHub Token",
      icon: Key,
      placeholder: "ghp_xxxxxxxxxxxx",
      description: "Required for private repositories",
      type: "password",
    },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FormField
              control={form.control}
              name={field.name as "projectName" | "repoURL" | "githubToken"}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <field.icon className="h-4 w-4 text-muted-foreground" />
                    {field.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.placeholder}
                      className="mt-1 bg-background text-foreground"
                      type={field.type || "text"}
                      {...formField}
                    />
                  </FormControl>
                  <FormDescription className="mt-1 text-sm text-muted-foreground">{field.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Button
            disabled={CreateProjectMutation.isPending}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            {CreateProjectMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              <>
                <FolderGit2 className="mr-2 h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}

