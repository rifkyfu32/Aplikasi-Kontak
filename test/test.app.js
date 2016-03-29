/**
 * Created by rifky on 28/03/16.
*/

var	mocha	= require('mocha'),
	request	= require('supertest'),
	assert	= require('assert'),
	app		= require('../server'),
	mongojs	= require('mongojs'),
	db		= mongojs('kontaklist',['kontaklist']);

describe('Test	REST API Aplikasi-Kontak', function(){

	var id
	
	it('POST /listkontak harus dapat menginput data ke database', function(done){
		request(app).post('/listkontak')
		.send({ nama: 'fu', email: 'fu@gmail.com', telp: '0877-0000-1111'})
 		.set('Accept',	'application/json')
 		.expect('Content-Type',	/json/)
 		.expect(200)
 		.expect(function(req,res){
 			db.kontaklist.insert(req.body,function (data) {
 				assert.equal(typeof req.body._id, 'object')
 				assert.equal(res.body.length, 1)
 				assert.equal(res.body._id.length, 24)
 				assert.equal(res.body, data)
 				id = res.body[0]._id
			})
		})
		.end(function(err,	res){
			if(err)	return	done(err)
				done()
			})
	})

	it('GET /listkontak harus me-return data json semua kontaklist dari database', function(done){
		request(app).get('/listkontak')
 		.set('Accept',	'application/json')
 		.expect('Content-Type',	/json/)
 		.expect(200)
 		.expect(function(res){
 				db.kontaklist.find(function (data) {
 					assert.equal(res.body,	data);
				})
 		})
		.end(function(err,	res){
			if(err)	return	done(err)
				done()
			})
	})

	

})
