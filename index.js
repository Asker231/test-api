const Pool = require('pg').Pool
const express = require('express')
const v4 = require('uid').uid()
const cors = require('cors')
const  env = require('dotenv').config()


console.log(env.parsed.PORT);

const app = express()
app.use(express.json())
app.use(cors({origin:["http://localhost:5173"]}))

app.listen(env.parsed.PORT,(err)=>{
    if(!err) console.log("Server run");
})

const pool = new Pool({
  user:'postgres',
  host: 'localhost',
  database:'todo',
  password: '199823',
  port: '1998',
})

app.get('/',(req,res)=>{
    try {
        res.status(200).send("Hello users")
        res.end()
    } catch (error) {
        console.log(error);
    }
})

app.post('/authuser',async(req,res)=>{
    const {email,password} = req.body
    try {
        if(!email == "" || !password == ""){
               await pool.query(`insert into users(email,password) values ('${email}','${password}')`)
              res.status(200).send("succsess")
              res.end()
        }else{
            res.end()
            return console.log("Not validate email") 
        }
   
    } catch (error) {
        console.log(error);
    }
})
app.post('/addpost',async(req,res)=>{
    const {post_text,fk_users} = req.body
    try {
        if(!post_text == ""){
         await pool.query(`insert into posts (post_text,fk_users) values ('${post_text}','${fk_users}')`)
         res.status(200).send("succsess")
         res.end()
        }else{
            res.end()
            return console.log("Not validate text") 
        }
    } catch (error) {
        console.log(error);
    }
})

app.get('/allusers',async(req,res)=>{
       try{
       let result = await pool.query('select * from users')
       res.status(200).send(result.rows)
       res.end()
       console.log(result);
       }catch(error){
        console.log(error);
       }  
})


