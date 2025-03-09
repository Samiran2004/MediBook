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
router.get('/logindashboard', (req, res, next) => {
    try {
        res.render('logindashboard');
    } catch (error) {
        res.render('errorPage');
    }
});

// Serve Doctor Login Page...
router.get('/doctorLogin', (req, res) => {
    res.render('docLogin');
});

// Serve Doctor Signup page...
router.get('/doctorSignup', (req, res) => {
    res.render('docSignup')
});

// Serve User Login page...
router.get('/userLogin', (req, res) => {
    res.render('userLogin');
});

// Serve User Signup page...
router.get('/userSignup', (req, res) => {
    res.render('userSignup')
})

export default router;