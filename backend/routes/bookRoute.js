import express from "express";
import {Book} from "../models/bookmodel.js"


const router = express.Router();

// Route for save a Book
router.post('/', async (request,response)=>{
    try {
        
      if( !request.body.title || !request.body.author || !request.body.publishYear)
      {
          
         return response.status(400).send({
            message:'send all required feilds: title, author, publishYear'
         });
      }
   
      const newBook = {
         title: request.body.title,
         author: request.body.author,
         publishYear: request.body.publishYear,
      };
   
      const book = await Book.create(newBook);
      return response.status(201).send(book);
   
   } catch (error){
      console.log(error.message);
      response.status(500).send({message:error.message});
   }
   });
   
   //Route for send all books from databse
   router.get('/',async(request,response)=>{
   
       try{
   
         const books = await Book.find({});
         return response.status(200).json({
            count: books.length,
            data:books,
         });
   
       } catch(error){
          console.log(error);
          response.status(500).send({message:error.message});
       }
   });
   
   
   //Route for get one book from databse by Id
   router.get('/:id',async(request,response)=>{
   
      try{
         
        const {id} = request.params; 
   
        const book = await Book.findById(id);
      
        if(!book)
        {
         return response.status(500).send({message:'Book not found'});
        }
   
   
        return response.status(200).json(book);
   
      } catch(error){
         console.log(error);
         response.status(500).send({message:error.message});
      }
   });
   
   //Route for update a book from databse by Id
   router.put('/:id',async(request,response)=>{
   
      try{
   
       if( !request.body.title || !request.body.author || !request.body.publishYear)
         {   
            return response.status(400).send({
               message:'send all required feilds: title, author, publishYear'
            });
         } 
         
        const {id} = request.params; 
   
        const result = await Book.findByIdAndUpdate(id,request.body);
       
        if(!result)
        {
         return response.json.status(404).json({message:'Book not found'});
        }
   
        return response.status(200).send({message:'Book updated successfully'});
   
      } catch(error){
         console.log(error);
         response.status(500).send({message:error.message});
      }
   });
   
   
   //Route for deleting the book 
   router.delete('/:id',async(request,response)=>{
     
    try { const {id} = request.params;
   
     const result = await Book.findByIdAndDelete(id);
   
     if(!result){
      return response.status(404).json({message:'Book not found'});
     }
   
     return response.status(200).send({message:'Book deleted successfully'});
   } catch (error){
      console.log(error);
      response.status(500).send({message:error.message})
   }
   });
   

   export default router;