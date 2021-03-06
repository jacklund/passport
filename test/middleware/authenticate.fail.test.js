var chai = require('chai')
  , authenticate = require('../../lib/passport/middleware/authenticate')
  , Passport = require('../..').Passport;


describe('middleware/authenticate', function() {
  
  describe('fail', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail();
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('fail', function(req) {
      received = req;
    });
    
    var request, response;

    before(function(done) {
      chai.connect.use(authenticate('fail').bind(passport))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should not set user', function() {
      expect(request.user).to.be.undefined;
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(401);
      expect(response.getHeader('WWW-Authenticate')).to.be.undefined;
      expect(response.body).to.equal('Unauthorized');
    });

    it('should emit event', function() {
      expect(received).to.equal(request);
    });
  });
  
  describe('fail with redirect', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail();
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('fail', function(req) {
      received = req;
    });
    
    var request, response;

    before(function(done) {
      chai.connect.use('express', authenticate('fail', { failureRedirect: 'http://www.example.com/login' }).bind(passport))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should not set user', function() {
      expect(request.user).to.be.undefined;
    });
    
    it('should redirect', function() {
      expect(response.statusCode).to.equal(302);
      expect(response.getHeader('Location')).to.equal('http://www.example.com/login');
    });

    it('should emit event', function() {
      expect(received).to.equal(request);
    });
  });
  
  describe('fail with challenge', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail('MOCK challenge');
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('fail', function(req) {
      received = req;
    });
    
    var request, response;

    before(function(done) {
      chai.connect.use(authenticate('fail').bind(passport))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should not set user', function() {
      expect(request.user).to.be.undefined;
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.equal('Unauthorized');
    });
    
    it('should set authenticate header on response', function() {
      var val = response.getHeader('WWW-Authenticate');
      expect(val).to.be.an('array');
      expect(val).to.have.length(1);
      
      expect(val[0]).to.equal('MOCK challenge');
    });

    it('should emit event', function() {
      expect(received).to.equal(request);
    });
  });
  
  describe('fail with challenge and status', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail('MOCK challenge', 403);
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('fail', function(req) {
      received = req;
    });
    
    var request, response;

    before(function(done) {
      chai.connect.use(authenticate('fail').bind(passport))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should not set user', function() {
      expect(request.user).to.be.undefined;
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(403);
      expect(response.getHeader('WWW-Authenticate')).to.be.undefined;
      expect(response.body).to.equal('Forbidden');
    });

    it('should emit event', function() {
      expect(received).to.equal(request);
    });
  });
  
  describe('fail with status', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail(400);
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('fail', function(req) {
      received = req;
    });
    
    var request, response;

    before(function(done) {
      chai.connect.use(authenticate('fail').bind(passport))
        .req(function(req) {
          request = req;
        })
        .end(function(res) {
          response = res;
          done();
        })
        .dispatch();
    });
    
    it('should not set user', function() {
      expect(request.user).to.be.undefined;
    });
    
    it('should respond', function() {
      expect(response.statusCode).to.equal(400);
      expect(response.getHeader('WWW-Authenticate')).to.be.undefined;
      expect(response.body).to.equal('Bad Request');
    });

    it('should emit event', function() {
      expect(received).to.equal(request);
    });
  });
  
});
