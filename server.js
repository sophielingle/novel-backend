const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose
  .connect("mongodb+srv://sophielingle:bXBkxIiIlIre8H4M@cluster0.3nmaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const bookSchema = new mongoose.Schema({
    title: String,
    bestSeller: String,
    image: String,
    author: String,
    publication_year: String,
    genre: String,
    decription: String,
    extended_description: String,
    price: String,
    favorite_chapters: Array
})

const Book = mongoose.model("Book", bookSchema);

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/index.html");
});

app.get("/api/books", async(req,res) => {
    const books = await Book.find();
    res.send(books);
});

app.post("/api/books", upload.single("img"), async(req, res) => {
    if (req.body.favorite_chapters) {
        try {
          req.body.favorite_chapters = JSON.parse(req.body.favorite_chapters);
        } catch (error) {
          return res.status(400).send("Invalid format for favorite chapters");
        }
    }
    

    const result = validateBook(req.body);
  
    if(result.error) {
      res.status(400).send(result.error.details[0].message);
      console.log("I have an error");
      return;
    }

    //const bookId = books.length + 1;
  
    const book = new Book({
      //_id:bookId,
      title:req.body.title,
      bestSeller:req.body.bestSeller,
      author:req.body.author,
      publication_year:req.body.publication_year,
      genre:req.body.genre,
      description:req.body.description,
      extended_description:req.body.extended_description,
      price:req.body.price,
      favorite_chapters: req.body.favorite_chapters
    });
  
    if(req.file){
      book.image = req.file.filename;
    }
  
    const newBook = await book.saved();

    res.status(200).send(newBook);
  });

  app.put("/api/books/:_id", upload.single("img"), async(req,res)=>{
    const result = validateEditingBook(req.body);
    
    req.body.favorite_chapters = JSON.parse(req.body.favorite_chapters);

    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    const fieldsToUpdate = {
    title:req.body.title,
    bestSeller:req.body.bestSeller,
    author:req.body.author,
    publication_year:req.body.publication_year,
    genre:req.body.genre,
    description:req.body.description,
    extended_description:req.body.extended_description,
    price:req.body.price,
    favorite_chapters:req.body.favorite_chapters
    }
  
    if(req.file){
        fieldsToUpdate.image = req.file.filename;
    }
  
    const wentThrough = await Book.updateOne({_id:req.params._id}, fieldsToUpdate);

    const book = await Book.findOne({_id:req.params._id});

    res.status(200).send(book);
  });
  
  app.delete("/api/books/:_id", async(req,res)=>{
    const book = await Book.findByIdAndDelete(req.params._id);

    res.status(200).send(book);
  });
  
  const validateBook = (book)=>{
    const schema = Joi.object({
        title:Joi.string().min(1).required(),
        bestSeller:Joi.string().min(2).required(),
        author:Joi.string().required(),
        publication_year:Joi.string().required(),
        genre:Joi.string().required(),
        description:Joi.string().required(),
        extended_description:Joi.string().required(),
        price:Joi.string().required(),
        favorite_chapters: Joi.array().items(Joi.string()).length(3).required()
    });
  
    return schema.validate(book);
    };

    const validateEditingBook = (book)=>{
        const schema = Joi.object({
            title:Joi.string().min(1).required(),
            bestSeller:Joi.string().min(2).required(),
            author:Joi.string().required(),
            publication_year:Joi.string().required(),
            genre:Joi.string().required(),
            description:Joi.string().required(),
            extended_description:Joi.string().required(),
            price:Joi.string().required(),
            favorite_chapters:Joi.string().required()
        });
      
        return schema.validate(book);
    };

app.listen(3001, () => {
    console.log("Listening...");
});