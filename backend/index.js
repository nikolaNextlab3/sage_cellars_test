const express = require('express');
var expressStaticGzip = require("express-static-gzip");
const bodyParser = require('body-parser');
const app =  express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/", expressStaticGzip(__dirname + "/build/"));


const PORT= 4000;  //backend running port , 3000 for frontend
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
