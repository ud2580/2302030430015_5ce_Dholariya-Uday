const express = require('express')
const app= express();
const bcript = require('bcrypt')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// for routes looking like this `/products?page=1&pageSize=50`


app.listen(3000 ,()=>{
    console.log("lesten port 3000")
})
const URL = "mongodb://localhost:27017/Booksystem"
mongoose.connect(URL);
const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("data base connected")
})
db.on('error', ()=>{
    console.log(err,"data base createsome error")
})
db.on('disconnected', ()=>{
    console.log("data base disconnected")
})


const bookSchema= mongoose.Schema({
    bookname:{
        type:String
    },
    auther:{
        type:String
    },
    topic:{
        type:String
    },
    price:{
        type:String
    }

})

const Book = mongoose.model('Book',bookSchema);



app.post('/', async function (req, res) {
 try{
    const data = req.body;
    const book = new Book(data)
    const respons = await book.save();

  
    res.status(200).json(respons)

 }catch(err){
res.status(404).json({err:"internal server error"})
 }
})
app.get('/books', async function (req, res) {
    try{
       
       const respons = await Book.find();
       if(!respons){
        res.status(403).send("book not avalable")
        }
       res.status(200).json(respons)
   
    }catch(err){
   res.status(404).json({err:"internal server error"})
    }
   })
   app.get('/book/:id', async function (req, res) {
    try {
        const bookId = req.params.id;

        
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).send("Book not found");
        }

        res.status(200).json(book);

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Internal server error"});
    }
});
app.put('/books/update/:id', async function (req, res) {
    try {
        const bookId = req.params.id;
        const bookData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
            new: true,          
            runValidators: true 
        });

        app.put('/books/update/:id', async function (req, res) {
            try {
                const bookId = req.params.id;
                const bookData = req.body;
        
                // Find and update the book by its ID
                const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, {
                    new: true,           // Return the updated document
                    runValidators: true // Validate the data before updating
                });
        
                // Check if the book was found and updated
                if (!updatedBook) {
                    return res.status(404).send("Book not found or not updated");
                }
        
                res.status(200).json(updatedBook);
        
            } catch (err) {
                console.error(err); // Log the error for debugging
                res.status(500).json({ error: "Internal server error" });
            }
        });
        
        if (!updatedBook) {
            return res.status(404).send("Book not found or not updated");
        }

        res.status(200).json(updatedBook);

    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete('/books/delete/:id', async function (req, res) {
    try {
        const bookId = req.params.id.trim(); 

        
        const deletedBook = await Book.findByIdAndDelete(bookId);

        
        if (!deletedBook) {
            return res.status(404).send("Book not found or not deleted");
        }

        res.status(200).json({ message: "Book deleted successfully", deletedBook });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
});



 