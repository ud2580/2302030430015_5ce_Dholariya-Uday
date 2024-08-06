const express = require('express');
const app = express();
app.set('view engine','ejs')
app.use(express.static("public"))
const bodyparse= require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


app.listen(1030, () => {
    console.log('listening on port 1030');
});
app.use(bodyparse.urlencoded({extended:true}));
console.log('MONGO_URL:',"mongodb://localhost:27017/emploedata");

const URL="mongodb://localhost:27017/emploedata";

mongoose.connect(URL)

    .then(()=> console.log("Mongoconnection complete"))
    .catch((err)=>console.log("connection error",err))

    const emploeSchema = mongoose.Schema(
        {
            username:{
                type:String,
                require:true,
            },
            email:{
                type:String,
                require:true,
               
            },
            password:{
                type:String,
                require:true,
            },
            role:{
                type:String,
                require:true,
            },
            gender:{
                type:String,
                require:true,
            }
          
        }
    )
    const Emploe = mongoose.model('Emploe',emploeSchema);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signin.html')
})



app.post("/login" , async(req,res) => {
   
 const newEmploe = new Emploe();
 newEmploe.username=req.body.username;
 newEmploe.email=req.body.email;
 newEmploe.password=req.body.password;
 newEmploe.role=req.body.role;
 newEmploe.gender=req.body.gender;

 try{
    await newEmploe.save();
    
    console.log('Emploe data saved successfully:',newEmploe);
    res.sendFile(__dirname + "/login.html");
   
 }
 catch(error){
    console.log("error saving emploe data",error);
    res.status(500).send("Error fetching emploe data");
 }
});

const Login = mongoose.model("Login", emploeSchema);
   app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html')
   })



app.post('/submit', async(req, res) => {

    const { username, password } = req.body;
    

    try {
      // Find the user by username

      const emploe = await Emploe.findOne({username: username,password: password});
  
      if (!emploe) {
        return res.sendFile(__dirname + '/signin.html'); // Redirect to sign.html if user not found
      }else{
        return res.sendFile(__dirname + '/table.html'); 
      }
  
     
      
    

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  
})



app.get("/users", async(req,res)=>{
    try{
        const emploes = await Emploe.find();
        res.json(emploes);
    }catch(error){
        console.log(error.stack);
        res.status(500).send("Error fetching users data");

    }

});

app.use( (req,res,next)=>{
res.status(404).send("sorry , we  coutdn't find that")
});

app.use( (err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("somthing waent wrong")
    });

