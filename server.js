
let express = require('express');
// console.log(express);
let app = express();
app.use(express.json());
let Joi = require("joi");
//CRUD --> C- Create, r-read, u-update, d-delete
//create --POST() --read ---get() ---- update --- put() ---- delete --- delete()

 let courses = [{
     id:1,
     name:"angular",
 },
 {
     id:2,
     name:"reactjs"
 },
 {
     id:3,
     name:"vue.js"
 },
 {
     id:4,
     name:"typescript"
 },
 {
     id:5,
     name:"javascript"
 }
];


// PATH ---> callback function
// app.get("/user", (req,res) => {
//   res.send("hello user!!!!!");
// });

// app.get("/courses", (req,res) => {
//     res.send(JSON.stringify(['angular','javascript','typescript']));
// });


// app.get("/course/:year/:month", (req,res) => {
//     res.send(req.params);
// })


app.get("/courses", (req,res) => {
    res.send(courses);
});

app.get("/course/:id", (req,res) => {
 // if id not match then return a bad request   
 let course = courses.find((data) => data.id === parseInt(req.params.id));
 if(!course){return res.status(403).send({message:"invalid course id"})};
//if id get's match send course obj
res.send(course);
});

//create a courses

app.post("/createcourse", (req,res) => {

  let result =  ValidationError(req.body)   // req.body.name
//    console.log(result);
if(result.error){return res.status(400).send(result.error.details[0].message)}

  let course = {
    id: courses.length + 1,
    name: req.body.name
  };

   courses.push(course);
   res.send(courses);

} );


app.put("/updatecourse/:id", (req,res) => {
//check the id first 
let course =  courses.find((data) => data.id === parseInt(req.params.id));
if(!course) {return res.status(403).send({message:"Invalid course id"})};
// Joi validation
  let result = ValidationError(req.body);
 if(result.error){return res.status(400).send(result.error.details[0].message)};
//update the property
 course.name = req.body.name;
courses.push(course);
// response the data
res.send(courses);
});

app.delete("/removecourse/:id",(req,res) => {
//check the id first 
let course =  courses.find((data) => data.id === parseInt(req.params.id));
if(!course) {return res.status(403).send({message:"Invalid course id"})};
//{id:1,name:"angular"}
let index = courses.indexOf(course)  
courses.splice(index,1);
res.send(courses);

});


function ValidationError(error){
    let schema = Joi.object({
        name: Joi.string().min(3).max(12).required(),
    });
    
    return schema.validate(error);
}

app.listen(4200,() => console.log(`conneted to port 4200`));


//create a api for music app
//name,singer,releaseDate,price, actors
//get all songs data --- get()
// get data by id ----- get()
// create song===== post()
//update song by id --- put()
//remove song by id ==== remove()