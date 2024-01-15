const express = import(express);

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({"message": "HI Is this working"});
  console.log('DONE!!!!!');
})

module.exports = router;