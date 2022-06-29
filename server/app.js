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
database: "lama_shop",
});

app.listen(port, () => {

console.log(`Alo - alo, Baločka Jonas klauso - ${port}`);
});


//////////////////////////////////////////////
///////////////  FRONT SHOP  /////////////////




//////////////////////////////////////////////
///////////////  BACK SHOP  //////////////////

// CREATE CAT //
app.post("/admin/cats", (req, res) => {
    const sql = `
    INSERT INTO cats
    (title)
    VALUES (?)
  `;

  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;   
    res.send({result, msg: {text: 'New cat created', type: 'success'}});
  });
});


// GET CAT //
app.get("/admin/cats", (req, res) => {
    const sql = `
    SELECT *
    FROM cats
    ORDER BY title

  `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });