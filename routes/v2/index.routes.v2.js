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

// Testing frontend routes...
router.get('/temp1', (req,res, next)=>{
    res.render("userSignup")
})
router.get("/temp2", (req, res, next) => {
  res.render("userLogin");
});
router.get("/temp3", (req, res, next) => {
  res.render("docSignup");
});
router.get("/temp4", (req, res, next) => {
  res.render("docLogin");
});

export default router;