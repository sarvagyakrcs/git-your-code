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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import { RegisterSchema, RegisterSchemaType } from "@/lib/schema/register-schema"
import { useMutation } from "@tanstack/react-query"
import Register from "@/actions/auth/register"
import { $Enums } from "@prisma/client"

export default function OnboardingForm({ Role } : {Role : $Enums.UserRole}) {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })

  const registerClient = useMutation({
    mutationKey: ["registerClient"],
    mutationFn: (values: RegisterSchemaType) => Register(values, Role),
    onMutate: () => {
      toast.loading("Creating your account", { id: "registerClient" })
    },
    onError: (error) => {
      toast.error(error.message, { id: "registerClient" })
    },
    onSuccess: (data) => {
      toast.success(data.success, { id: "registerClient" })
    }
  })

  function onSubmit(values: RegisterSchemaType) {
    try {
      registerClient.mutate(values)
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form id="client-sign-up" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto">

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tony"

                      type="text"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="middlename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middlename</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional"

                      type="text"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stark"

                      type="text"
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  type=""
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="tony@starkindustries.com"
                  className="w-full"
                  type="email"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*******************"
                  type="password"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <ProfilePicUploader setFile={setProfilePic} /> */}
        <Button disabled={registerClient.isPending} form="client-sign-up" type="submit">Submit</Button>
      </form>
    </Form>
  )
}