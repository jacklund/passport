var chai = require('chai')
  , authenticate = require('../../lib/passport/middleware/authenticate')
  , Passport = require('../..').Passport;


describe('middleware/authenticate', function() {
  
  describe('fail with callback', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail();
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('unauthorized', function(req) {
      received = req;
    });
    
    var request, error, user;

    before(function(done) {
      function callback(e, u) {
        error = e;
        user = u;
        done();
      }
      
      chai.connect.use(authenticate('fail', callback).bind(passport))
        .req(function(req) {
          request = req;
        })
        .dispatch();
    });
    
    it('should not error', function() {
      expect(error).to.be.null;
    });
    
    it('should pass false to callback', function() {
      expect(user).to.equal(false);
    });
    
    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });

    it('should not emit event', function() {
      expect(received).to.be.null;
    });
  });
  
  describe('fail with callback, passing info', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail({ message: 'Invalid password' });
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('unauthorized', function(req) {
      received = req;
    });
    
    var request, error, user, info;

    before(function(done) {
      function callback(e, u, i) {
        error = e;
        user = u;
        info = i;
        done();
      }
      
      chai.connect.use(authenticate('fail', callback).bind(passport))
        .req(function(req) {
          request = req;
        })
        .dispatch();
    });
    
    it('should not error', function() {
      expect(error).to.be.null;
    });
    
    it('should pass false to callback', function() {
      expect(user).to.equal(false);
    });
    
    it('should pass info to callback', function() {
      expect(info).to.be.an('object');
      expect(info.message).to.equal('Invalid password');
    });
    
    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });

    it('should not emit event', function() {
      expect(received).to.be.null;
    });
  });
  
  describe('fail with callback, passing challenge and status', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail('Bearer challenge', 403);
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('unauthorized', function(req) {
      received = req;
    });
    
    var request, error, user, challenge, status;

    before(function(done) {
      function callback(e, u, c, s) {
        error = e;
        user = u;
        challenge = c;
        status = s;
        done();
      }
      
      chai.connect.use(authenticate('fail', callback).bind(passport))
        .req(function(req) {
          request = req;
        })
        .dispatch();
    });
    
    it('should not error', function() {
      expect(error).to.be.null;
    });
    
    it('should pass false to callback', function() {
      expect(user).to.equal(false);
    });
    
    it('should pass challenge to callback', function() {
      expect(challenge).to.equal('Bearer challenge')
    });
    
    it('should pass status to callback', function() {
      expect(status).to.equal(403)
    });
    
    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });

    it('should not emit event', function() {
      expect(received).to.be.null;
    });
  });
  
  describe('fail with callback, passing status', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail(402);
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('unauthorized', function(req) {
      received = req;
    });
    
    var request, error, user, challenge, status;

    before(function(done) {
      function callback(e, u, c, s) {
        error = e;
        user = u;
        challenge = c;
        status = s;
        done();
      }
      
      chai.connect.use(authenticate('fail', callback).bind(passport))
        .req(function(req) {
          request = req;
        })
        .dispatch();
    });
    
    it('should not error', function() {
      expect(error).to.be.null;
    });
    
    it('should pass false to callback', function() {
      expect(user).to.equal(false);
    });
    
    it('should pass challenge to callback', function() {
      expect(challenge).to.equal(402);
    });
    
    it('should pass status to callback', function() {
      expect(status).to.be.undefined;
    });
    
    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });

    it('should not emit event', function() {
      expect(received).to.be.null;
    });
  });
  
  describe('fail with callback and options passed to middleware', function() {
    function Strategy() {
    }
    Strategy.prototype.authenticate = function(req) {
      this.fail();
    }    
    
    var passport = new Passport();
    passport.use('fail', new Strategy());

    var received = null;
    passport.on('unauthorized', function(req) {
      received = req;
    });
    
    var request, error, user;

    before(function(done) {
      function callback(e, u) {
        error = e;
        user = u;
        done();
      }
      
      chai.connect.use(authenticate('fail', { foo: 'bar' }, callback).bind(passport))
        .req(function(req) {
          request = req;
        })
        .dispatch();
    });
    
    it('should not error', function() {
      expect(error).to.be.null;
    });
    
    it('should pass false to callback', function() {
      expect(user).to.equal(false);
    });
    
    it('should not set user on request', function() {
      expect(request.user).to.be.undefined;
    });

    it('should not emit event', function() {
      expect(received).to.be.null;
    });
  });
  
});
