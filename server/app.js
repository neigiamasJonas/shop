const express = require("express"); 
const app = express(); 
const port = 3006; 
const cors = require("cors");

app.use(express.json({ limit: '10mb' }));     // padidintas photo upload limitas + sql confige taip pat padidintas

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

// DELETE CAT //
app.delete("/admin/cats/:id", (req, res) => {
  const sql = `
  DELETE FROM cats
  WHERE id = ?
`;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;   
    res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});

// EDIT CAT //
app.put("/admin/cats/:id", (req, res) => {
  const sql = `
  UPDATE cats
  SET title = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
    });
});


// CREATE PRODUCT //
app.post("/admin/products", (req, res) => {
  const sql = `
  INSERT INTO products
  (title, price, in_stock, cats_id, photo)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.price, req.body.inStock, req.body.cat, req.body.photo], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, new and shiny product was created', type: 'success' } });
  });
});


// GET PRODUCTS //
app.get("/admin/products", (req, res) => {
  const sql = `
  SELECT p.id, price, p.title, c.title AS cat, in_stock, last_update AS lu, photo
  FROM products AS p
  LEFT JOIN cats AS c
  ON c.id = p.cats_id
  ORDER BY title
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});


// DELETE PRODUCTS //
app.delete("/admin/products/:id", (req, res) => {
  const sql = `
  DELETE FROM products
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Product gone', type: 'success' } });
  });
});


// EDIT PRODUCTS //
app.put("/admin/products/:id", (req, res) => {
  const sql = `
  UPDATE products
  SET title = ?, price = ?, last_update = ?, cats_id = ?, in_stock = ?, photo = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.price, req.body.lu, req.body.cat, req.body.in_stock, req.body.photo, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Product updated', type: 'success' } });
  });
});


// delete/edit photo //
app.delete("/admin/photos/:id", (req, res) => {
  const sql = `
  UPDATE products
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'Photo removed', type: 'success' } });
  });
});