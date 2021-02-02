const express = require("express");
const session = require('express-session');
const app = express();

app.use(session({secret: 'algorandom'}));

app.use(express.static(__dirname + '/'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/static', express.static("static"));

app.get("/", (req,res)=>{
  if(req.session.count == undefined){
    req.session.count = 0;
  }
  req.session.count += 1;
  res.render("count", {counter : req.session.count});
});

app.get("/sumar", (req,res)=>{
  req.session.count = req.session.count += 1;
  res.redirect("/")
});

app.get("/reset", (req,res)=>{
  req.session.count = 0;
  res.redirect("/")
});

const server = app.listen(8000, () =>
console.log(`el server esta usando el puerto: ${server.address().port}!`)
);