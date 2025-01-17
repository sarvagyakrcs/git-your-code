"use client"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import { CreateProjectSchema, CreateProjectSchemaType } from "@/lib/schema/create-project-schema"
import { useMutation } from "@tanstack/react-query"
import { CreateProject } from "@/actions/projects"
import { Loader, Plus } from "lucide-react"

export default function CreateProjectForm() {

    const form = useForm<CreateProjectSchemaType>({
        resolver: zodResolver(CreateProjectSchema),
    })

    const CreateProjectMutation = useMutation({
        mutationKey: ["createProject"],
        mutationFn: CreateProject,
        onMutate: () => {
            toast.loading("Creating project", { id: "createProject" });
        },
        onError: () => {
            toast.error("Failed to create project. Please try again.", { id: "createProject" });
        },
        onSuccess: () => {
            toast.success("Project created successfully", { id: "createProject" });
            form.reset();
        }
    })

    function onSubmit(values: CreateProjectSchemaType) {
        CreateProjectMutation.mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project name</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input
                                    placeholder="Slides"
                                    type=""
                                    {...field} />
                            </FormControl>
                            <FormDescription>This is your project name.</FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="repoURL"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github Repository URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://github.com/sarvagyakrcs/youdemy.git"

                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormDescription>This is your github repo URL.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="githubToken"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github Token</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="************"

                                    type=""
                                    {...field} />
                            </FormControl>
                            <FormDescription>Optional : For private repositories</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={CreateProjectMutation.isPending} type="submit">{ CreateProjectMutation.isPending ? <Loader className="h-6 w-6 animate-spin" /> : <Plus className="h-6 w-6" /> } Create</Button>
            </form>
        </Form>
    )
}