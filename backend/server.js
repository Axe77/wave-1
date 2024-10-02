import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "../db/connectToMongoDB.js";
import dotenv from "dotenv";


const port = process.env.PORT || 5000;
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is working well");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); 
app.use("/api/users", userRoutes);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is working on port ${port}`);
});






// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import messageRoutes from "./routes/messages.js";
// import connectToMongoDB from "../db/connectToMongoDB.js";
// import cookieParser from "cookie-parser";

// const port= process.env.PORT || 5000;
// const app = express();
// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());


// app.get("/", (req,res)=>{
//     res.send("Server is working well");
// })

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// app.listen (port, ()=>{
//     connectToMongoDB();
//     console.log(`Server is working on port ${port}`);
// })