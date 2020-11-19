const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const day = date.getDate();


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


mongoose.connect(process.env.ROUTE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("item",itemsSchema);

const item1 = new Item({
    name: "Welcome to your to-do list!"
});


const item2 = new Item({
    name: "Hit the + buttton to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});





const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema); 



//day

app.get("/",function(req,res){


    Item.find({}, function(err,foundItems){
        if (foundItems.length === 0){
            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Items entered");
                }

                res.redirect("/");
            });

        }else{

            res.render("list",{
                listTitle : day,
                newItems : foundItems
        });
        //rslist.save();

        }
    });



});

app.get("/:customNameList", function(req,res){
    const customListName = _.capitalize(req.params.customNameList);

    List.findOne({name: customListName},function(err,foundList){
       if(!err){
        if(foundList){
            //console.log("Exists");

            //Show an existing list
            res.render("list",{
                listTitle : foundList.name,
                newItems : foundList.items
        });

        }else{
            //console.log("Doesn't exist");
            //create a new list

            const list = new List({
                name: customListName,
                items: defaultItems
            });
        
            list.save();
            res.redirect("/"+ customListName);
        }
       }
    });
    
    
   


});


app.post("/", function(req,res){

    let listName = req.body.list;
    let itemName = req.body.item;

    const _item = new Item({
        name: itemName
    });


    if(listName === day){
        _item.save();
        res.redirect("/");

    }else {
        List.findOne({name: listName}, function(err,foundList){
            foundList.items.push(_item);
            foundList.save();
            res.redirect("/" + listName );
        });
    }
});


app.post("/delete", function(req,res){
    const checkedItemId = req.body.check;
    const listName = req.body.listName;

    if(listName === day){
        Item.findOneAndRemove({_id: checkedItemId},function(err){
            if(!err){
                //console.log("Successfully deleted!");
                res.redirect("/");
                
            }
            
        });

    }else{
        List.findOneAndUpdate({name: listName},{$pull:{items:{_id: checkedItemId}}}, function(err,foundList){
            if(!err){
                 res.redirect("/" + listName);
             }
            });
    }


});



let port = process.env.PORT;
if(port == null || port== ""){
    port = 3000
}

app.listen(port,function(req,res){
    console.log("Server is up and running")
});