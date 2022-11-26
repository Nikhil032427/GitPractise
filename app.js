const express = require('express');
const app = express();
const request = require('request');
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
 // for using local resources like css and images
app.get("/",(req,res) => {
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", (req,res) => {
    var firstname = req.body.fname;
   
    var lastname = req.body.lname;
    var email =  req.body.emailAdd;
    const https = require('https');
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_feilds: {
                FNAME : req.body.fname,
                LNAME:req.body.lname,
            }
           
           
        }]
    }
    console.log(data);


    var jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/a37db254de" //url from mailchimp

const options = {
    method: "POST",
    auth: "Nikhil:057c08f6e9916bd4498c5acc2ebf8d12-us21",
}
const requests = https.request(url, options, (response) => {
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",(data) => {
        console.log(JSON.parse(data));
    })
})

requests.write(jsonData);
requests.end();

})



app.post("/failure",(req,res) =>{
    res.redirect("/");
})





app.listen("3000",() => {
    console.log("Server is running on 3000");
})


//Api key
// 057c08f6e9916bd4498c5acc2ebf8d12-us21

// audiance id
// a37db254de