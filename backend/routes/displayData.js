const express = require('express');
const routes = express.Router();

routes.post('/foodData', (req,res)=>{
    try {
        res.send([global.foodItems])
    } catch (error) {
        
    }
})

module.exports= routes;