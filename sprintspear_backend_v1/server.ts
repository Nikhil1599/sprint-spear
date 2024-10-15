import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import projectRoutes from "./src/project/projectRoutes"
import taskRoutes from "./src/task/taskRoute"

dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
    res.send("This is home route")
})

app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/tasks", taskRoutes)

// SERVER
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running in Port:${port}`)
})