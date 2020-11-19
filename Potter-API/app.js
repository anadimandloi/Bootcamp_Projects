const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/potterDB', {useNewUrlParser: true, useUnifiedTopology: true});



const app = express()

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));


const db = mongoose.connection;
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
  });

const Article = mongoose.model('Article', articleSchema);


app.route("/articles")


.get(function(req,res){
  Article.find(function(err,foundArticles){
    if(!err){
      res.send(foundArticles);
    }else{
      res.send(err);
    }
  });
})


.post(function(req,res){

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  
  newArticle.save(function(err){
    if(!err){
      res.send("Sucessfully added new article");
    }else{
      res.send(err);
    }
  });
})
  
  .delete(function(req,res){
    Article.deleteMany(function(err){
      if(!err){
        res.send("Sucessfully deleted all articles");
      }else{
        res.send(err);
      }
    });
  });

app.route("/articles/:articleTitle")


.get(function(req,res){

  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle)
    }else{
      res.send("No articles found");
    }
  });

})

.put(function(req,res){
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title,content:req.body.content},
    {overwrite:true},
    function(err){
      if(!err){
        res.send("Sucessfully updated");
      }
    }
  );
})

.patch(function(req,res){
  Article.update(
    {title: req.params.articleTitle},
    {$set:req.body},
    function(err){
      if(!err){
        res.send("Sucessfully patched");
      }else{
        res.send(err);
      }
    }
  );
})

.delete(function(req,res){
  Article.deleteOne({title:req.params.articleTitle},function(err){
    if(!err){
      res.send("Deleted one article successfully");
    }else{
      res.send(err)
    }
  });
});

app.listen(3000,function(req,res){
    console.log("Server is up and running");
});