
const socket = io();


function sendMessage(){
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    socket.emit("POST_MESSAGE",{email,message})
}


socket.on("NEW_MESSAGE",(msg)=>{
appendMessage(msg);
    
})

 function appendMessage(msg){
    const dateTime = new Date();
    const fecha = dateTime.getDate() + '-' + ( dateTime.getMonth() + 1 ) + '-' + dateTime.getFullYear();
    const hora = dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
   const newMessage=`<div class="lineMessage"><p style="color:#405EF7">${msg.email}</p><p style="color:#906840">[${fecha} ${hora} ]: </p><p style="color:#71EB7A">${msg.message}</p><div>`
    document.getElementById("messages").innerHTML+=newMessage;
}


socket.on("INIT",(messages)=>{

    for(let msg of messages){

         appendMessage(msg)
    }
 
})