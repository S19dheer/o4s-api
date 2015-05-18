var productDao = require("../dao/productDao");


exports.checkProduct = function(req, res) {

    var productCode = req.body.productCode;//productCode recieved in the request.

    productDao.checkProductDetails(productCode, function(daoErr, daoResult) {

        if (daoErr) { //if error occurs 
            res.json({
                "error": daoErr
            });

        } else if (daoResult && daoResult.checkProductResult === 1) { // if product exists in db and active has been updated to false.

            res.json({
                "productCheck": "original"
            });

        } else if (daoResult && daoResult.checkProductResult === 0) {//if nothing was updated

            res.json({
                "productCheck": "fake"
            });
        } else if (daoResult && daoResult.checkProductResult && (typeof daoResult.checkProductResult) === "string") {// if product not found or active was already false.
            res.json({
                "productCheck": daoResult.checkProductResult
            });
        } else{
        	console.log("exception");
        	res.end();
        }
    })
}
