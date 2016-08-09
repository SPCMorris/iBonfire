const Chat = require('../models/chatModel.js');

module.exports = {
  '/': {
    post: (req, res) => {
      console.log('Received POST at /bonfireChat')
      const newMessage = {
        messages: req.body.messages,
        id_Users: req.body.id_Users
      }

      Chat.addMessage(newMessage)
        .then((message) => {
            let chatIDs = {
              id_Bonfires: req.body.id_Bonfires,
              id_Messages: message.id
            }
            Chat.createChatRoom(chatIDs)
              .then((response) => {
                console.log('Chat Room with id of: ', response.id, ' has been created');
                res.send(response)
              })
              .catch((err) => {
                console.log(err, ': error inside of addMessage model')
              })
          })
      },
    get: (req,res) => {
      console.log('Received GET at /bonfireChat')
      Chat.getAllChatMessages(12342523)
        .then((bonfireChat) => {
          console.log(bonfireChat)
          res.send(message)
        });
    }
  }
}