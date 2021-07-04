const router = require('express').Router()

router.get("/",(req,res)=>{
    res.status(200).json("server in runinng on the port number 5050")
})

module.exports=router