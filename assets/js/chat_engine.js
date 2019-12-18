class chatEngine{
    constructor(chatBoxId,userEmail){
    this.chatBox=$(`#${chatBoxId}`);
   
    this.userEmail=userEmail;
    this.socket=io.connect('http://3.15.176.32:5000');
    this.connectionHandler();
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
           

            self.socket.emit("join_room", {
                user_email:self.userEmail,
                chatroom:'codeial'
            })
            self.socket.on('user_joined',function(data){
              
            })
        
        })


        $('#send-message').click(function(){
            
            let msg=$('#chat-message-input').val();
            $('#chat-message-input').val('');
            
            if(msg != ''){
                 
                self.socket.emit("send_message",{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial',              
                
                } )
                console.log('cameout')
            }
        })


        self.socket.on('receive_message',function(data){
            
            let newMessage=$("<li>");
            let messageType='other-message';
            if(data.user_email==self.userEmail){
                messageType="self-message";
            }
            newMessage.append($('<span>',{'html':data.message}));
            newMessage.append('<sub>',{
                'html':data.user_email
            })
            newMessage.addClass(messageType);
            $("#chat-messages-list").append(newMessage);
            
            
            $("#chat-messages-list").scrollTop($("#chat-messages-list").scrollTop() + 100);
        })

    }


    
}