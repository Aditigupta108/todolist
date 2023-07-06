const express=require("express");
const bodyparser=require("body-parser");
const date=require(__dirname+"/date.js");
const app=express();
var items=[];
const workitems=[];
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function(req,res){
    let day=date.getday();
    
         res.render("index",{listitems:day,newitem:items});
   

});
app.post("/",function(req,res){
    
    let item=req.body.nameitem;
    if(req.body.list==="work"){
        workitems.push(item);
        res.redirect("/work");

    }else{
     items.push(item);
    res.redirect("/");
    }


});
app.get("/work",function(req,res){
    res.render("index",{listitems:"work list",newitem:workitems});

});
app.post("/work",function(req,res){
    let item=req.body.nameitem;
    workitems.push(item);
    res.redirect("/work");
});
app.listen(3000,function(){
    console.log("server has started the port 3000");
});