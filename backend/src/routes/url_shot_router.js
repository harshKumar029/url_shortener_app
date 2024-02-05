const  express=require("express");
const router =express.Router();



router.post('/test2',async (req,res)=>{
    try {
        res.send({ message: 'Test API is working!' });
      } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
module.exports = router;