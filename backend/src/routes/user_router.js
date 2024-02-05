const  Router=require("express");
const router =Router();
const { signup,login } = require("../controller/AuthController");

router.post('/signup',signup);
router.post('/login',login);


router.post('/test',async (req,res)=>{
    try {
        res.send({ message: 'Test API is working!' });
      } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
module.exports = router;