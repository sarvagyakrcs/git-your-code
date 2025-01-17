import React from 'react'
import DashboardGrid from './_components/grid';
import prisma from '@/lib/prisma';
import SomethingWentWrongPage from '@/components/pages/something-went-wrong-page';
import InviteTeamMembers from './_components/invite-team-members';
import CommitLog from './_components/dommit-log';

type Props =  {
    params: Promise<{ id: string }>
}

const ProjectPage = async ({ params }: Props) => {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: {
            id: id
        },
        include: {
            commits: true
        }
    })
    if(!project) return <SomethingWentWrongPage />
    return (
        <div> 
            <InviteTeamMembers />
            <DashboardGrid project={project} />
            <CommitLog commits={project.commits} />
        </div>
    )
}

export default ProjectPage