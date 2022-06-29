const express = require("express"); 
const app = express(); 
const port = 3006; 
const cors = require("cors");

app.use(cors());

const mysql = require("mysql");

app.use(

express.urlencoded({

    extended: true,

})
);

app.use(express.json());

const con = mysql.createConnection({

host: "localhost",

user: "root",

password: "",

database: "ISIRASHOM DATABASE",
});

app.listen(port, () => {

console.log(`Bebras klauso porto Nr ${port}`);
});