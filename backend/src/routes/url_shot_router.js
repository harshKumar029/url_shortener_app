const  Router=require("express");
const router =Router();
const {createurl,Shortid,dashboard,deleteUrlData} = require('../controller/Url_shotController');

router.post('/', createurl);
router.get('/dashboard',dashboard)
router.delete('/deleteUrl',deleteUrlData)
router.get('/:shortURL', Shortid);

router.post('/test2',async (req,res)=>{
    try {
        res.send({ message: 'Test API is working!' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
module.exports = router;