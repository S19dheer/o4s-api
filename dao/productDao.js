var db = require('mongoskin').db('mongodb://localhost:27017/o4s');

exports.checkProductDetails = function(productCode, callback) {

    var querydata = {
        "productId": productCode
    };

    console.log(querydata);

    db.collection('inventory').find(querydata).toArray(function(findError, findResult) {//find product by productId

        if (findError) {//if error return error to the controller

            callback(findError, findResult);

        } else if (findResult.length === 0) {//product not found in the db.

            var findObj = {
                "checkProductResult": "Product not found.This might be a fake product."
            };

            callback(findError, findObj);

        } else if (findResult && findResult[0] && (findResult.length === 1)) {//product found in db.

            if (findResult[0].active === "true") {//if active is true then update it to false.

                var updateCriteria = {
                    "productId": productCode
                };

                var updateData = {
                    "$set": {
                        "active": "false"
                    }
                };

                db.collection('inventory').update(updateCriteria, updateData, function(updateError, updateResult) {

                    var updatedObj = {
                        "checkProductResult": updateResult
                    };

                    callback(updateError, updatedObj);//returns the updateResult recieved from db.

                })
            } else if (findResult[0].active === "false") {//if active is already false.
                var responseObj = {
                    "checkProductResult": "Product by this id is already sold.This might be a fake product."
                };

                callback(updateError, responseObj);
            }
        }
    });
}
