const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes');
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENTURL, credentials:true }));
app.use(cookieParser());

const port = process.env.PORT || 4040;
const dbUrl = process.env.DBURL;

// user Routes
app.use('/user',userRouter);
// job routes
app.use('/jobs',jobRouter);
// default route
app.use((req,res)=>{
    res.status(200).json({message:'Server running...'})
})

const connectServer = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Db connected successfully')   
        app.listen(port,()=>console.log(`server running at http://localhost:${port}/`))
    } catch (error) {
        console.log('server connection failed',error.message)
        process.exit(1);
    }
}

connectServer();