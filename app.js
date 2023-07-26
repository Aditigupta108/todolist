const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require('mongoose');
const _=require("lodash");//iterating arrays js library
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
main().catch(err => console.log(err));
async function main(){

   mongoose.connect('mongodb://127.0.0.1:27017/to-dolist',{useNewUrlParser:true});
  const itemsschema={
    name:String
  };
  const listschema={
    name:String,
    items:[itemsschema]
  };
  const list=mongoose.model("list",listschema);
  const item=mongoose.model("item",itemsschema);
  const item1=new item({
    name:"welcome to your todolist"
  });
  const item2=new item({
    name:"hit the + button to aff a new item"
  });
  const item3=new item({
    name:"<- hit this to delete an item"
  });
  
  //await item.insertMany(defaultitem);
  const workitem=[];
  const defaultitem=[item1,item2,item3];



app.get("/",function(req,res){
    const founditem=item.find({},function(err,founditem){
        if(founditem.length===0){
            const defaultitem=[item1,item2,item3];
           
            item.insertMany(defaultitem);
            res.redirect("/");//it will redirect directly to the else condition

        }
        else{

    
         res.render("index",{listItems:"today",newitem:founditem});
        }
   

});
});
app.get("/:customListName",async function(req,res){
  const customlistname=_.capitalize(req.params.customListName);
  const foundlist=
  await list.findOne({name:customlistname});
    if(foundlist===null){
      const List=new list({
        name:customlistname,
        items:defaultitem
      });
      await List.save();
      res.redirect("/"+ customlistname);
      
    }else{
  
     res.render("index",{listItems:foundlist.name,newitem:foundlist.items});
      
      
      
    }
  });


app.post("/",async function(req,res){
    
    const itemname=req.body.nameitem;
    const listname=req.body.list;
    const item4=new item({
        name:itemname
    });
    if(listname==="today"){
      item4.save();
      res.redirect("/");

    }
    else{
      const foundlist=
      await list.findOne({name:listname});
        foundlist.items.push(item4);
        foundlist.save();
        res.redirect("/"+ listname);
      
    }


});
app.post("/delete",  async function(req,res){
  const deletitem=req.body.checkbox;
  const listname=req.body.listname;
  if(listname=="today"){
    await item.findByIdAndRemove({_id:deletitem});
    res.redirect("/");
  }else{
    list.findOneAndUpdate({name:listname},{$pull:{items: {_id:deletitem}}},function(err,foundlist){
      if(!err){
        res.redirect("/"+listname);
      }
    })
  }
  //await item.deleteOne({_id:deletitem});
  //res.redirect("/");
  //console.log(deletitem);
  //item.findByIdAndRemove(deletitem);
  //res.redirect("/");
});
/*app.get("/work",function(req,res){
    res.render("index",{listitems:"work list",newitem:workitem});

});
app.post("/work",function(req,res){
    let item=req.body.nameitem;
    workitems.push(item);
    res.redirect("/work");
});*/
app.listen(3000, (err) => {
    if (err) throw err;
    console.log(`Listning...`);
});


}


