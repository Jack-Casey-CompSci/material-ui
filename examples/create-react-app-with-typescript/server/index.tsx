const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'project_table'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM crud_table";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });  
})

app.post("/api/insert", (req, res) => {
    const address = req.body.address
    const size = req.body.size 
    const type = req.body.type 
    const market = req.body.market 

    const sqlinsert = "INSERT INTO `project_table`.`crud_table` (`address`, `size`, `type`, `market`) VALUES (?,?,?,?)"
    db.query(sqlinsert, [address, size, type, market], (err, result) => {
        console.log(result);
    })   
});

app.put("/api/update/address/:id", (req, res) => {
    const address = req.body.address
    const id = req.params.id 

    const sqlUpdate = "UPDATE crud_table SET address = ? WHERE id = ?"
    db.query(sqlUpdate, [address, id], (err, result) => {
        if (err) console.log(err);
        console.log(result)
    })   
});

app.put("/api/update/size/:id", (req, res) => {
    const size = req.body.size 
    const id = req.params.id 

    const sqlUpdate = "UPDATE crud_table SET size = ? WHERE id = ?"
    db.query(sqlUpdate, [size, id], (err, result) => {
        if (err) console.log(err);
        console.log(result)
    })   
});

app.put("/api/update/type/:id", (req, res) => {
    const type = req.body.type 
    const id = req.params.id 

    const sqlUpdate = "UPDATE crud_table SET type = ? WHERE id = ?"
    db.query(sqlUpdate, [type, id], (err, result) => {
        if (err) console.log(err);
        console.log(result)
    })   
});

app.put("/api/update/market/:id", (req, res) => {
    const market = req.body.market
    const id = req.params.id 

    const sqlUpdate = "UPDATE crud_table SET market = ? WHERE id = ?"
    db.query(sqlUpdate, [market, id], (err, result) => {
        if (err) console.log(err);
        console.log(result)
    })   
});

app.listen(3001, () => {
    console.log("running on port 3001")
});