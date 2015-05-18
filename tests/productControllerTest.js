'use strict';
var db = require('mongoskin').db('mongodb://localhost:27017/o4s');
var assert = require("assert");
var needle = require('needle');



beforeEach(function(done) {

    var insertData = [

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

    // resets the db
    db.collection("inventory").remove({}, function() {
        //creates data for checking product  in the db.
        db.collection('inventory').insert(insertData, function(err, result) {
            console.log("Data created !");
            done();
        });

    });

});


describe('o4stesting', function() {
    this.timeout(50000);


    it('pass case', function (done) {

        var testJson = {
            "productCode": "nike123"
        }



        needle.post("http://localhost:3000/checkProduct", testJson, function(err, response, body) {
            console.log(response);
            
            var res = body;
            console.log(err);
            assert.equal(err, null);
            assert.equal(typeof(res), "object");
            assert.equal(typeof(res.productCheck), "string");
            assert.equal((res.productCheck), "original");
            done();
        });
    });

    it('fail case', function (done) {

        var testJson = {
            "productCode": "nike321"
        };



        needle.post("http://localhost:3000/checkProduct", testJson, function(err, response, body) {
            var res = body;
            console.log(response);

            assert.equal(err, null);
            assert.equal(typeof(res), "object");
            assert.equal(typeof(res.productCheck), "string");
            assert.equal((res.productCheck), "Product not found.This might be a fake product.");
            done();

        });
    });

});
