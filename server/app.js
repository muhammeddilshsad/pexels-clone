import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./src/routes/authRouter.js"
import imageRoute from "./src/routes/imageRouter.js"

dotenv.config()
const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]

}))

app.use(express.json());

app.use('/api/auth',authRouter)
app.use('/api/image',imageRoute)


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongodb Connected"))
.catch(err => console.error(err))

app.listen(process.env.PORT,()=>{
    console.log(`server is ruuning ${process.env.PORT}`)
})
