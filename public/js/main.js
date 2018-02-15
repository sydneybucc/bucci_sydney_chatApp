(() => {
  const socket = io();

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message');
      nickName = null;

  function setNickname() {
    //debugger;
    nickName = this.value;
  }

  function handleSendMessage(e) {
    e.preventDefault(); //prevent the default behaviour - a submit triggers a page reload which we dont want
    //debugger;
    nickName = (nickName && nickName.length > 0) ? nickName : 'user'; //turnery statemant; an if/else statement in one

    //grab the text from the input field at the bottom of the page
    msg = `${nickName} says ${chatMessage.value}`;

    //emit a chat event so that we can pass it through to the server (and everyone else)
    socket.emit('chat message', msg);
    chatMessage.value = '';
    return false;
  }

  function appendMessage(msg) {
    //debugger;
    let newMsg = `<li>${msg.message}</li>`;
    messageList.innerHTML += newMsg;
  }

  function appendDMessage(msg) {
    //debugger;
    let newMsg = `<li>${msg}</li>`;
    messageList.innerHTML += newMsg;
  }

  nameInput.addEventListener('change', setNickname, false);
  chatForm.addEventListener('submit', handleSendMessage, false);
  socket.addEventListener('connectMsg', appendMessage, false); //make sure the connectMsg name is the same on the app.js
  socket.addEventListener('disconnect message', appendDMessage, false);
})();
