let express = require('express');
let router = express.Router();
let User = require('../schema/user');

router.post('/page/:id', async(req,res) => {
 let perpage = 4;
 let currentpage = req.params.id || 1;
 let data = await User.UserModel
                         .find()
                         .skip((perpage * currentpage) - perpage)
                         .limit(perpage)
                         ;
    let pageCount = await User.UserModel.count();
    let totalpages = Math.ceil(pageCount/perpage);
    res.send({
        perpage:perpage,
        data:data,
        totalpages: totalpages
    });
});

module.exports = router;

//perPage = 10;
//currentPage = 1;
//data = 100;
// perpage * currentpage - perpage //skip // 10 * 2 - 10 = 100
//limit(10)
//pagecount = 100;
//totalpages = Math.ceil()  // pageCount/perpage = 85/10 = 8. // 9