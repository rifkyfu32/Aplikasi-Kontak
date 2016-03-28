/**
 * Created by rifky on 28/03/16.
*/

var	mocha	= require('mocha'),
	request	= require('supertest'),
	assert	= require('assert'),
	app		= require('../server'),
	mongojs	= require('mongojs'),
	db		= mongojs('kontaklist',['kontaklist']);

describe('Test	REST API', function(){
 	describe('GET /listkontak', function(){
 		it('harus me-return data json semua kontaklist dari database', function(done){
 			request(app).get('/listkontak')
 			.set('Accept',	'application/json')
 			.expect('Content-Type',	/json/)
 			.expect(200)
 			.expect(function(res){
 				db.kontaklist.find(function (data) {
 					assert.equal(res.body.message,	data);
				})
 			})
 			.end(function(err,	res){
 				if(err)	return	done(err)
 					done()
 			})
 		});
 	});
});
