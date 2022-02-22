//npm body-parser express request
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const app = express();
const https = require("https");

// const { response } = require("express");

//usebodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//specify static folder
app.use(express.static("public"));

//app.get
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

//app.post
app.post("/", (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const emailInput = req.body.emailInput;

  const data = {
    members: [
      {
        email_address: emailInput,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  //conversion to flat JSON Obj
  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/366334a044";

  const options = {
    method: "POST",
    auth: "mingmingjae:00024e08dd29af695e578bf8872b94f3-us14",
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.send(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end;
});

//failure

app.post(failure, (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

//api key
// 00024e08dd29af695e578bf8872b94f3-us14

//List id
// 366334a044
