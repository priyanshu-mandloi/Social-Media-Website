

// Creating a class for the browser side (frontend side)
class ChatEngine{
  constructor(chatBoxId,userEmail){
     this.chatBoxId=$(`#${chatBoxId}`); 
     this.userEmail = userEmail;
    //  this.socket = io.connect('https://avlanche.onrender.com',{
     this.socket = io.connect('http://localhost:5000',{
       transports : ['websocket'] 
      });
     if(this.userEmail){
        this.connectionHandler();
     } 
    }

  connectionHandler(){
    let self = this;
    this.socket.on('connect',function(){
       console.log("Connection is established on the sockets...!");
       self.socket.emit('join_room',{
         user_email:self.userEmail,
         chatroom:'codeial'
        });
        self.socket.on('user_joined',function(data){
          console.log('a user is joined in',data);
        });
      });

  // Code for pressing an send button
  $('#send-message').click(function(){
      let msg = $('#chat-message-input').val();
      if(msg!=''){
        self.socket.emit('send_message',{
            message:msg,
            user_email:self.userEmail,
            chatroom:'codeial'
        });
      }
  });

  self.socket.on('receive_message',function(data){
    console.log("Message is sent",data.message);
      
    let newmessage = $('<li>');
    let messageType = 'other-msg';
    if(data.user_email==self.userEmail){
       messageType = 'self-msg';
    }
     newmessage.append($('<span>',{
       'html':data.message
     }));  
     newmessage.addClass(messageType);
     $('#chat-message-list').append(newmessage);
  });

  }
}





// class ChatEngine{
//   constructor(chatBoxId, userEmail){
//       this.chatBox = $(`#${chatBoxId}`);
//       this.userEmail = userEmail;

//       this.socket = io.connect('http://localhost:5000');

//       if (this.userEmail){
//           this.connectionHandler();
//       }

//   }


//   connectionHandler(){
//       let self = this;

//       this.socket.on('connect', function(){
//           console.log('connection established using sockets...!');


//           self.socket.emit('join_room', {
//               user_email: self.userEmail,
//               chatroom: 'codeial'
//           });

//           self.socket.on('user_joined', function(data){
//               console.log('a user joined!', data);
//           })


//       });

//       // CHANGE :: send a message on clicking the send message button
//       $('#send-message').click(function(){
//           let msg = $('#chat-message-input').val();

//           if (msg != ''){
//               self.socket.emit('send_message', {
//                   message: msg,
//                   user_email: self.userEmail,
//                   chatroom: 'codeial'
//               });
//           }
//       });

//       self.socket.on('receive_message', function(data){
//           console.log('message received', data.message);


//           let newMessage = $('<li>');

//           let messageType = 'other-message';

//           if (data.user_email == self.userEmail){
//               messageType = 'self-message';
//           }

//           newMessage.append($('<span>', {
//               'html': data.message
//           }));

//           newMessage.append($('<sub>', {
//               'html': data.user_email
//           }));

//           newMessage.addClass(messageType);

//           $('#chat-messages-list').append(newMessage);
//       })
//   }
// }