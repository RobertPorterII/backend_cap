import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import blogRouter from "./routes/blogs.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3737

// Connecting and testing Mongo DB
// try {
//     await mongoose.connect(process.env.MONGODB_URI)
//     // testing mongodb connection
//     mongoose.connection.on('connected', () => console.log(connected));
    
// } catch (e) {
//     console.log(e);
    
// }
try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to mongodb");
    
} catch (error) {
    console.log(error);
    
    
}

// middleware for logger, parse data to teh body and allowing the backend to talk frontend of my machine

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cors());


//Routes



app.get("/", (req, res) => {
    // console.log(req);
    
    res.send("Anime Lives in This API")
});

app.use("/blogs", blogRouter);


// Error middleware

app.use((e, req, res, next) => {
    console.log(e);
    res.status(500).json({message: e.message, error: e});
    
});

app.listen(PORT, () => console.log(`Server is off to the races on port ${PORT}`));
