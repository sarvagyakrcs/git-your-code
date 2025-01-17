import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import SidebarLayout from './_components/sidebar-layout'
import prisma from '@/lib/prisma'
import { GetUserProjects } from '@/actions/projects'

type Props = {
    children: React.ReactNode
}

const ProtectedLayout = async ({ children }: Props) => {
    const session = await auth();
    if(!session) redirect("/onboarding")
    const projects = await GetUserProjects();
    return (
        <SidebarLayout session={session} projects={projects}>
            { children }
        </SidebarLayout>
    )
}

export default ProtectedLayout