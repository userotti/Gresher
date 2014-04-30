exports.init = function(zeromq) {
    MessageManager = exports.MessageManager = function() {
        this.zeromq = zeromq;
        this.ports = {
      'auth': 'tcp://127.0.0.1:12345'
            };
        this.socket = this.zeromq.socket('dealer');
        this.socket.connect(this.ports['auth']);
        console.log('MessageManager: dealer bound!');
    }
    MessageManager.prototype.send = function(obj, callback) {
        if(typeof(obj) == 'object') {
            if(obj.type != undefined && obj.value != undefined) {
                var message = JSON.stringify(obj);
                this.socket.send(message);
                this.socket.once('message', function(data) {
                    var result = JSON.parse(data);
                    callback(result);
                });
            }
        }
    }
    return new MessageManager();
}