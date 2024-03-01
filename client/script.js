const socket = io();

let username = "";
const btn = document.getElementById("join-chat");
const usernameInput = document.getElementById("username-input");
const form = document.getElementById("form");
const chatRoomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.getElementById("message-container");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  username = usernameInput.value;
  if (username) {
    // go to chat page
    form.style.display = "none";
    // clear username -> to do
    chatRoomContainer.style.display = "block";
  }
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    id: socket.id,
    username: username,
    message: messageInput.value,
  };
  socket.emit("sending message event", data);
  renderMessage(data, "SENT");
});

function renderMessage(data, typeOfMessage) {
  const msgDiv = document.createElement("div");
  console.log(msgDiv);
  msgDiv.innerText = `${data.username}: ${data.message}`;
  if (typeOfMessage === "SENT") {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message");
  }
  messageContainer.append(msgDiv);
  messageContainer.value = "";
}

socket.on("io spreading message", (data) => {
  // if the message recieved was sent by me
  // only or if it's coming from other
  // socket
  if (socket.id !== data.id) {
    renderMessage(data, "RECIEVED");
  }
});
