
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path';
import mongoose  from "mongoose";
import route from './server/routes/route.js';
const __dirname = path.resolve();
const app = express();

//mongoDb
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected `);
    }catch(err){
        console.log(err);

    }
}
//mongodb finish


dotenv.config({path:'confige.env'})
const PORT = process.env.PORT || 5000
app.use(morgan('tiny'));

//database
connectDB()

//view engine
app.use(express.urlencoded({ extended : true}))
app.set("view engine", "ejs")


app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//routes
app.use('/',route)
// routes finish




app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});