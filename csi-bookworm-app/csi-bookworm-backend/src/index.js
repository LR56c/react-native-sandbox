import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/auth_routes.js'
import {connectDb} from "./db.js";
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/books', authRoutes)
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    await connectDb()
})
