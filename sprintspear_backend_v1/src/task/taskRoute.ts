import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "./taskController";

const router = Router()

router.get("/", getTasks)
router.post("/", createTask)
router.patch("/:taskId/status", updateTaskStatus)

export default router;