import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId)
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true
            }
        })
        res.json(tasks);
    } catch (error) {

    }
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, description, status, priority, tags, startDate,
        dueDate, points, projectId, authorUserId, assignedUserId } = req.body

    try {
        const task = await prisma.task.create({
            data: {
                title, description, status, priority, tags, startDate, dueDate,
                points, projectId, authorUserId, assignedUserId
            }
        })
        res.status(201).json(task)
    } catch (error: any) {
        res.status(500).json({ message: `Error creating a task: ${error.message}` })
    }
}

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.body
    const { status } = req.body
    try {
        const tasks = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status
            }
        })
        res.json(tasks)
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving tasks: ${error.message}` })
    }
}