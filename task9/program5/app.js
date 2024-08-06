const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(express.static("public"))

app.listen(1030, () => {
    console.log('listening on port 1030');
});

let users = [
    {id:1,name:'uday'},
    {id:1,name:'ayushi'},
    {id:1,name:'aditi'}
]

app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/add_user.html")

});

app.get("/api/user", function (req, res) {
    res.json(users)

});
app.get("/api/user/:id", function (req, res) {
    
    const id= req.params.id;
    

});











