import express from 'express';

const router = express.Router();

// Serve home page...
router.get('/', (req, res, next) => {
    try {
        res.render('home');
    } catch (error) {
        res.render('errorPage');
    }
});

// Serve signup page...
router.get('/signup', (req, res, next) => {
    try {
        res.render('signUpPage');
    } catch (error) {
        res.render('errorPage');
    }
});

// Serve Login Dashboard Page...
router.get('/logindashboard', (req, res, next) =>{
    try {
        res.render('logindashboard');
    } catch (error) {
        res.render('errorPage');
    }
});

// Testing frontend routes...
router.get('/temp1')
router.get('/temp2')
router.get('/temp3')

export default router;