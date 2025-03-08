import express from 'express';

const router = express.Router();

router.get('/', (req, res, next)=>{
    try {
        res.render('home');
    } catch (error) {
        res.render('errorPage');
    }
});

export default router;