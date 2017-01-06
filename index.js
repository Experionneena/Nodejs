var express=require("express");
var _=require("lodash")
var bodyParser=require("body-parser");
//console.log(bodyParser);
// console.log(lod);
var app=express();
var fs=require("fs");
var userRouter=express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

userRouter.route('/fetch')
.get(function(request, response) {
    response.contentType('application/json');
    fs.readFile('user.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
      // var peopleJSON = JSON.stringify(data);
      var people=JSON.parse( data );
      // console.log(people);
      // console.log(people[0].name);
      // console.log(typeof data);
      response.send(people);
    }
  });
});
//  userRouter.route('/delete')
// .get(function(request, response) {
//     fs.readFile('user.json','utf8',function (err,data){
//     if (err) {
//       return console.log("error");
//     }
//     else{
//       // var peopleJSON = JSON.stringify(data);
//       var people=JSON.parse( data );
//       delete people[0];
//       people=JSON.stringify(people);
//       fs.writeFile('user.json',people,function(err){
//         if(err){
//           console.log("error");
//         }
//         else{
//           //console.log(people);
//             response.send(people);

//         }
//       });
//   }    
//   });
 
// });

userRouter.route('/:username')
.get(function(request, response) {
  response.contentType('application/json');
  fs.readFile('user.json','utf8',function (err,data){
  if (err) {
    return console.log("error");
  }
  else{
    var people=JSON.parse( data );
    //console.log(people);
    // console.log(people[0].name);
    // console.log(typeof data);
    response.send(_.find(people,{"name":request.params.username}));
    }
  });
});

userRouter.route('/delete/:username')
.delete(function(request, response) {
  response.contentType('application/json');
  fs.readFile('user.json','utf8',function (err,data){
  if (err) {
    return console.log("error");
  }
  else{
    // var peopleJSON = JSON.stringify(data);
    var people=JSON.parse(data);
    _.remove(people,{"name":request.params.username});
    fs.readFile('user.json',people,function(err){
    if(err){
      console.log("error");
    }
    else{
      people=JSON.stringify(people);
      fs.writeFile('user.json',people,function(err){
      if(err){
        console.log("error");
      }
      else{
        //console.log(people);
        console.log(people);
        response.send(people);
      }
    });
  }
});
//console.log(people);
// console.log(people[0].name);
}
});
});

userRouter.route('/update/:username/:age')
.put(function(request, response) {
    response.contentType('application/json');
    fs.readFile('user.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
        data=JSON.parse(data);
        data=data.filter(function(item){
        if(item.name==request.params.username){
            item.age=request.params.age;
        }
        return item;
        })
        data=JSON.stringify(data);
        console.log(data);
        fs.writeFile("user.json", data, function(err) {
        if(err) {
           return console.log(err);
        }
        else{
          response.send(data);
          console.log("value updated");
        }
    });
  }
});
});
userRouter.route('/add')
.post(function(request, response) {
    response.contentType('application/json'); 
fs.readFile('user.json','utf8',function (err,data){
        if (err) {
          return console.log("error");
        }
        else{
          var content=request.body;
          console.log(content);
          var person=JSON.parse(data);
          console.log(person);
          person.push(content);
          person=JSON.stringify(person);
          console.log(person);
          fs.writeFile("user.json", person, function(err) {
          if(err) {
            return console.log(err);
          }
          else{
            response.send(person);
            console.log("New entry made");
          }
       });
    
        }
  });
});
app.use('/',userRouter);
app.listen(8082, function(){
console.log("server started");
});
