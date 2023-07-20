const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const request = require('request')
const mailchimp = require('@mailchimp/mailchimp_marketing')

app.use(express.static(__dirname ))
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
   
    res.sendFile(__dirname+"/signup.html")
    

})

app.post("/",function(req,res){
    const listId = "56c7872c7b"
    const firstname=req.body.fname
    const lastnme = req.body.lname
    const email = req.body.mail

    console.log( firstname,lastnme,email)
    const code = res.statusCode
    console.log(code)
    if (code==200){
        res.sendFile(__dirname+"/sucess.html")
    }

    else{
        res.sendFile(__dirname+"/failure.html")
    }
})

app.listen(3000,function(){
    console.log("the server is running on port 3000")
})


app.post("/failure.html",function(req,res){
    res.redirect("/")
})

mailchimp.setConfig({
     apiKey: " ee2d43d9e44f12062aa4ab7ccbed1f28-us13 ",
    server: "US13"
  });


async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });
    run();
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }
 

 
// api key
// ee2d43d9e44f12062aa4ab7ccbed1f28-us13 

// audience id 
// 56c7872c7b