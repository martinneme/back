

const socket = io();

const addprod = document.querySelector('#send')

addprod.addEventListener('submit',(e)=>{
  e.preventDefault();

  const title = document.getElementById("title").value;
const price = document.getElementById("price").value;
const link = document.getElementById("link").value;

const prod = {
  "title": title,
  "price": price,
  "link":link
}
socket.emit("PRODUCT_ADDED",prod)

addprod.reset();
})

function sendMessage(){
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    socket.emit("POST_MESSAGE",{email,message})

    
    document.getElementById("message").value=""
   
}


socket.on("NEW_MESSAGE",(msg)=>{
appendMessage(msg);
    
})

 function appendMessage(msg){
 
   const newMessage=`<div class="lineMessage"><p style="color:#405EF7">${msg.email}</p><p style="color:#906840">[${msg.dateTime}]: </p><p style="color:#71EB7A">${msg.message}</p><div>`
    document.getElementById("messages").innerHTML+=newMessage;
}


socket.on("INIT",(messages)=>{

    for(let msg of messages){
     
         appendMessage(msg)
    }
 
})


socket.on("PRODUCTS", async (response) => {
    const url = "http://localhost:8080/main.hbs";
      fetch(url).then((resp) => {
        return resp.text();
    }).then((text) => {
      const template = Handlebars.compile(text);
      const html = template({response});
      document.querySelector("#products").innerHTML = html;
    });
  })