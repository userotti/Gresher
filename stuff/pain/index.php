<?php
//include '../php-zmq/api.php';

class MessageManager {
    public $zeromq;
    public $ports;
    public $socket;
    public function __construct() {
        $this->zeromq = new ZMQContext();
        $this->ports['auth'] = 'tcp://127.0.0.1:12345';
        $this->socket = $this->zeromq->getSocket(ZMQ::SOCKET_DEALER);
        $this->socket->connect($this->ports['auth']);
    }
    public function send($obj) {
        if(isset($obj->type) && isset($obj->value)) {
            $message = json_encode($obj);
            return $this->socket->send($message)->recv();
        }
    }
}

class Message {
    public $type;
    public $value;
    public function __construct($type, $value) {
        $this->type = $type;
        $this->value = $value;
    }
}
class Value {
    public $presence = '';
  public function __construct($username, $password) {
      if($username != null) {
          $this->username = $username;
      }
      if($password != null) {
          $this->password = $password;
      }
  }
}

echo 'hello<pre>';

$Value = new Value('Jordizle', 'Developer');
$Message = new Message('login', $Value);

$MessageManager = new MessageManager();

print_r($MessageManager);

$result = json_decode($MessageManager->send($Message));
echo '</pre>bye';


?>