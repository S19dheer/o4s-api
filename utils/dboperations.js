var db = require('mongoskin').db('mongodb://localhost:27017/o4s');


var insertdata = [

    {
        "userId": "ak",
        "productId": "nike123",
        "active": "true"
    }, {
        "userId": "ak",
        "productId": "nike456",
        "active": "true"
    }, {
        "userId": "ak",
        "productId": "nike789",
        "active": "true"
    }
];






describe('dbops', function() {
    //this.timeout(10000);
    it('insertdata', function(done) {




        db.collection('inventory').insert(insertdata, function(err, result) {
            if (err) console.log(err);
            if (result) console.log('Added!');
            done();
        });
    });

    // it('finddata', function(done) {

    //     var querydata = {

    //     }


    //     db.collection('inventory').find(querydata).toArray(function(err, result) {
    //         if (err) console.log(err);
    //         if (result) console.log(result);
    //         done();
    //     });
    // });

    it("updatedata", function(done) {
        var updatecriteria = {
            "productid": "nike123"
        }
        var updatedata = {
            "$set": {
                "active": "true"
            }
        };


        db.collection('inventory').update(updatecriteria, updatedata, function(err, result) {
            if (err) console.log(err);
            console.log('rez', result);
            done();

        })



    })
});
