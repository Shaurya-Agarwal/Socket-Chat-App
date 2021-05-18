const socket = io()
		
	  var setUsername;
	  setUsername = function() {
	  socket.emit('setUsername', document.getElementById('name').value);
	  };


      var user;
      socket.on('userExists', function(data) {
         document.getElementById('error-container').innerHTML = data;
      });


      socket.on('userSet', function(data) {
         user = data.username;
         document.body.innerHTML = 
         '<div class="cont"><h1 style="text-align:center">CHAT ROOM</h1><input type = "text" id = "message">\
         <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
         <div id = "message-container"></div></div>';
      });


      function sendMessage() {
         var msg = document.getElementById('message').value;
         if(msg) {
            socket.emit('msg', {message: msg, user: user});
         }
      }
      socket.on('newmsg', function(data) {
         if(user) {
            document.getElementById('message-container').innerHTML += '<div><b>' + 
               data.user + '</b>: ' + data.message + '</div>'
         }
      })