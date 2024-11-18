const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express();
const PORT = 8080;

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"0000",
    database:"blood_donation_project"
});


app.use(express.json());
app.use(cors());


app.get('/donor', (req, res)=>{
    const q = "select * from donor";
    db.query(q, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/donor", (req, res)=>{
    const q = "insert into donor (`name`, `phone`, `email`, `BloodType`, `Healthy`, `Addicted`, `photo`) values (?)";
    const values = [
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.BloodType,
        req.body.Healthy,
        req.body.Addicted,
        req.body.photo
    ]

    // const values = ["Shahil", "9876543210", "shahil@gmail.com", "A+", 1, 0, "abc.jpeg"];


    db.query(q, [values], (err, data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data)

    })
})

app.delete('/donor/:id', (req, res)=>{
    const Did = req.params.id;
    const q = "delete from donor where id = ?";

    db.query(q, [Did], (err, data)=>{
        if(err){
            return res.json(err);
        }
        return res.json("Donor data has been deleted successfully!");
    })
})












app.put("/donor/:id", (req, res)=>{
    const Did = req.params.id;
    const q = "Update donor set `name`=?, `phone`=?, `email`=?, `BloodType`=?, `Healthy`=?, `Addicted`=?`photo`=? where id=?";

    const values = [
        req.body.name,
        req.body.phone,
        req.body.email,
        req.body.BloodType,
        req.body.Healthy,
        req.body.Addicted,
        req.body.photo
    ]

    db.query(q, [...values, Did], (err, data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
})


app.listen(PORT, ()=>{
    console.log(`App is started at ${PORT}`);
})