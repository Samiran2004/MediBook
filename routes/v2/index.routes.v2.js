import express from 'express';

const route = express.Router();

route.get('/', (req, res, next)=>{
    try {
        res.render('home');
    } catch (error) {
        res.render('errorPage');
    }
})

export default route;