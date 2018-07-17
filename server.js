const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

// register partials directory
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// registering middleware to log the request detials
app.use( (req,res,next) => {
  var data = `${ new Date().toString() } : ${ req.method } ${ req.url }\n`;
  fs.appendFile( __dirname+'/logcat.txt' , data , (error) => { if(error) { console.log(error) } });
  next();
});

// Maintanance mode
// app.use((req,res,next) => {
//   res.render('maintanance.hbs');
// });

// registering middleware for static directory
app.use(express.static( __dirname + '/public' ));


// registering helper function
hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear()
});

hbs.registerHelper('capitalizeIt',(text1,text2) => {
  return text1.toUpperCase() + " " +text2.toUpperCase() ;
});

app.get('/', (req,res)=> {
  res.render('index.hbs',{
    'name' : 'Nirav'
  });
});

app.get('/json_data', (req,res) => {
  res.send({
      name : 'nirav',
      likes : [
        'Biking',
        'Gaming'
      ]
  });
});

app.get('/about' , (req,res) => {
  res.render('about.hbs',{
    'title' : "About"
  });
});

app.get('/project' , (req,res) => {
  res.render('project.hbs');
});

app.get('/bad', (req,res) => {
  res.send({
    error : 'Unable to handle the request'
  });
});

app.listen(port, () => { console.log(`server started on port number ${port}`); });
