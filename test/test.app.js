/**
 * Created by rifky on 28/03/16.
*/
var	mocha	= require('mocha'),
	request	= require('supertest'),
	app		= require('../server'),
	expect = require('expect.js');

describe('Test	REST API Aplikasi-Kontak', function(){

	var id	
	
	it('POST /listkontak post object', function(done){
		request(app).post('/listkontak')
			.send({ nama: 'Fu', email: 'fu@gmail.com', telp: '0800-0000-000'})
			.end(function(e,res){
				console.log(res.body)
				id = res.body._id
				expect(e).to.eql(null)
				expect(Object.keys(res.body).length).to.eql(4)
				expect(res.body._id.length).to.eql(24)
				done() 
			})
	})

	it('GET /listkontak/:id menerima object', function(done){
		request(app).get('/listkontak/'+id)
			.set('Accept',	'application/json')
 			.expect('Content-Type',	/json/)
 			.expect(200)
			.end(function(e, res){
				console.log(res.body)
				expect(e).to.eql(null)
				expect(typeof res.body).to.eql('object')
				expect(Object.keys(res.body).length).to.eql(4)
				expect(res.body._id.length).to.eql(24)
				expect(res.body._id).to.eql(id)
				done()
			})
	})

	it('GET /listkontak menerima semua daftar kontak ', function(done){
		request(app).get('/listkontak')
			.set('Accept',	'application/json')
 			.expect('Content-Type',	/json/)
 			.expect(200)
			.end(function(e, res){
				console.log(res.body)
				expect(e).to.eql(null)
				expect(Object.keys(res.body).length).to.be.above(0)
				expect(res.body.map(function (item){return item._id})).to.contain(id)
				done()
			})
	})

	it('PUT /listkontak/:id mengupdate object', function(done){
		request(app).put('/listkontak/'+id)
			.send({nama: 'Nova', email: 'nov@yahoo.com', telp: '0877-3340-1711'})
			.end(function(e, res){
				console.log(res.body)
				expect(e).to.eql(null)
				expect(typeof res.body).to.eql('object')
				expect(Object.keys(res.body).length).to.eql(4)
				done()
			})
	})

	it('GET /listkontak/:id ceck update object', function(done){
		request(app).get('/listkontak/'+id)
			.set('Accept',	'application/json')
 			.expect('Content-Type',	/json/)
 			.expect(200)
			.end(function(e, res){
				console.log(res.body)
				expect(e).to.eql(null)
				expect(typeof res.body).to.eql('object')
				expect(res.body._id.length).to.eql(24)
				expect(res.body._id).to.eql(id)
				expect(res.body.nama).to.eql('Nova')
				done()
			})
	})
	
	it('DELETE /listkontak/:id menghapus object', function(done){
		request(app).del('/listkontak/'+id)
			.end(function(e, res){
				console.log(res.body)
				expect(e).to.eql(null)
				expect(typeof res.body).to.eql('object')
				expect(Object.keys(res.body).length).to.eql(2)
				expect(res.body.ok).to.eql(1)
				expect(res.body.n).to.eql(1)
				done()
			})
	})

	it('GET /random url, Jika halaman tidak diketemukan', function(done){
		request(app).get('/random')
			.expect(404)
		    .end(function(e,res){
		    	console.log(res.text)
		    	expect(res.statusCode).to.eql(404)
		    	expect(res.status).to.eql(404)
		    	expect(res.text).to.eql('Maaf halaman yang anda cari tidak ditemukan')
		      	done()
		    })
	})
	

})
