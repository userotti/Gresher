exports.init = function(zeromq) {
    AuthManager = exports.AuthManager = function() {
        var self = this;
        this.zeromq = zeromq;
        this.ports = {
      'auth': 'tcp://127.0.0.1:12345'
            }
        this.socket = this.zeromq.socket('router');
        this.socket.identity = 'AuthManager';
        this.socket.bind(this.ports['auth'], function(err) {
            if(err){
                // handle error
            } else {
                console.log('AuthManager: router bound!');
                self.socket.on('message', function(envelope, obj) {
                    obj = JSON.parse(obj);
                    if(obj.type != undefined && obj.value != undefined) {
                        switch(obj.type) {
                            case 'login' :
                                response = self.login(obj.value, function(result) {
                                    result = JSON.stringify(result);
                                    self.socket.send([ envelope, result ]);
                                });
                                break;
                            case 'logout' :
                                response = self.logout(obj.value, function(result) {
                                    result = JSON.stringify(result);
                                    self.socket.send([ envelope, result ]);
                                });
                                break;
                            default:
                                response = JSON.stringify({ error: true, message: 'invalid.type' });
                        self.socket.send([ envelope, response ]);
                    }
                } else {
                    response = JSON.stringify({ error: true, message: 'invalid.params' });
                self.socket.send([ envelope, response ]);
            }
        });
    }
});
}
AuthManager.prototype.login = function(obj, callback) {
    if(obj.email != undefined && obj.password != undefined) {
        callback(user); // access database etc and success
    } else {
        callback({ error: true, message: 'login.credentials.invalid' });
}
}
AuthManager.prototype.logout = function(obj, callback) {
    callback({ }); // access database etc and log user out
}
return new AuthManager();
}