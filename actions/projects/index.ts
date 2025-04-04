"use server"

import { auth } from "@/auth"
import { GetUserById } from "../data/user";
import prisma from "@/lib/prisma";
import { CreateProjectSchema, CreateProjectSchemaType } from "@/lib/schema/create-project-schema";
import { revalidatePath } from "next/cache";
import { pollCommit } from "../github-octokit/commits";
import { handleError } from "@/utils/error-logs";
import { indexGithubRepository } from "@/lib/github-loader";

export const CreateProject = async (formData: CreateProjectSchemaType) => {
    try {
        const session = await auth();
        if(!session){
            throw new Error("Unauthorized")
        }
    
        const user = await GetUserById(session.user.id);
        if(!user){
            throw new Error("User not found")
        }
    
        const {
            data,
            success
        } = CreateProjectSchema.safeParse(formData);
        if(!success){
            throw new Error("Invalid data")
        }
    
        const project = await prisma.project.create({
            data: {
                name: data.projectName,
                githubURL: data.repoURL,
                userToProjects: {
                    create: {
                        userId: user.id
                    }
                }
            }
        })
        revalidatePath("/create")
        await indexGithubRepository(project.id, project.githubURL);
        await pollCommit(project.id);
        return project;
    } catch (error) {
        handleError(error);
        throw new Error("Failed to create project. Please try again.")
    }
}

export const GetUserProjects = async () => {
    try {
        const session = await auth();
        if(!session){
            throw new Error("Unauthorized")
        }
    
        const user = await GetUserById(session.user.id);
        if(!user){
            throw new Error("User not found")
        }
    
        const projects = await prisma.project.findMany({
            where: {
                userToProjects: {
                    some: {
                        userId: user.id
                    }
                }
            },
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        })
        return projects;
    } catch (error) {
        handleError(error);
        throw new Error("Failed to create project. Please try again.")
    }
}