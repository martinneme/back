
const socket = io();


function sendMessage(){
    const name = document.getElementById("name").value
    const message = document.getElementById("message").value

    socket.emit("POST_MESSAGE",{name,message})
}


socket.on("NEW_MESSAGE",(msg)=>{
appendMessage(msg);
    
})

 function appendMessage(msg){
   const newMessage=`<p>${msg.name}: ${msg.message}</p>`
    document.getElementById("messages").innerHTML+=newMessage;
}


socket.on("INIT",(messages)=>{

    for(let msg of messages){

         appendMessage(msg)
    }
 
})