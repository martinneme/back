

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


socket.on("PRODUCTS", (response) => {

    const url = "http://localhost:8080/main.hbs";
      fetch(url).then((resp) => {
        console.log(resp);
        return resp.text();
    }).then((text) => {
      const template = Handlebars.compile(text);
      const html = template({response});
      console.log(html)
      document.querySelector("#products").innerHTML = html;
    });
  })