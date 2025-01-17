import React from 'react'
import DashboardGrid from '../../home/_components/grid';
import prisma from '@/lib/prisma';
import SomethingWentWrongPage from '@/components/pages/something-went-wrong-page';

type Props =  {
    params: Promise<{ id: string }>
}

const ProjectPage = async ({ params }: Props) => {
    const { id } = await params;
    const project = await prisma.project.findUnique({
        where: {
            id: id
        }
    })
    if(!project) return <SomethingWentWrongPage />
    return (
        <div> 
            <DashboardGrid project={project} />
        </div>
    )
}

export default ProjectPage