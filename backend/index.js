import express, { request, response } from 'express';
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from  './models/bookmodel.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();


app.use(cors());

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling book routes
app.use('/books',bookRoute);

//Middleware for handling CORS policy 
//we can use both ways 1) this is default way
//app.use(cors());
// 2)
// app.use(cors(
//    {origin : 'http://localhost:5173',
//    methods : ['GET','POST','PUT','DELETE'],
//    allowHeaders : ['Content-type'],}
// ));
// app.use(cors({
//    origin: 'http://localhost:5173',
//    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
//  }));
 


app.get('/', (request,response) => {
   console.log(request);
   return response.send('this is new default route');
});




mongoose
   .connect(mongoDBURL)
   .then(()=> {
      console.log('App connected to the database');

      app.listen(PORT, () => {
         console.log(`App is running on ${PORT}`);
      });
             
   })
   .catch((error)=>{
      console.log(error);
   })



