"use client"

import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateProjectSchema, CreateProjectSchemaType } from "@/lib/schema/create-project-schema"
import { useMutation } from "@tanstack/react-query"
import { CreateProject } from "@/actions/projects"
import { Loader2, GitBranch, Key, FolderGit2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function CreateProjectForm() {
    const form = useForm<CreateProjectSchemaType>({
        resolver: zodResolver(CreateProjectSchema),
    })

    const CreateProjectMutation = useMutation({
        mutationKey: ["createProject"],
        mutationFn: CreateProject,
        onMutate: () => {
            toast.loading("Creating project", { id: "createProject" })
        },
        onError: () => {
            toast.error("Failed to create project. Please try again.", { id: "createProject" })
        },
        onSuccess: () => {
            toast.success("Project created successfully", { id: "createProject" })
            form.reset()
        }
    })

    function onSubmit(values: CreateProjectSchemaType) {
        CreateProjectMutation.mutate(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <FolderGit2 className="h-4 w-4" />
                                Project Name
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="My Awesome Project" {...field} />
                            </FormControl>
                            <FormDescription>
                                Choose a unique name for your project
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="repoURL"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <GitBranch className="h-4 w-4" />
                                GitHub Repository URL
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://github.com/username/repository.git"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The URL of your GitHub repository
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="githubToken"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <Key className="h-4 w-4" />
                                GitHub Token
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="ghp_xxxxxxxxxxxx"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Required for private repositories
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    disabled={CreateProjectMutation.isPending}
                    type="submit"
                    className="w-full"
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
            </form>
        </Form>
    )
}