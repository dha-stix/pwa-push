const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const fs = require("fs")
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const savedMessages = fs.readFileSync("messages.json")
const messagesData = JSON.parse(savedMessages)
const webpush = require("web-push")
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
let users = []

const vapidKeys = {
  publicKey: 'BBFZf6hiTdz5SEsuI8_WZfxRY4UHNWv9tt01cgQyCWF8XKKQ5vc0nN3JdDztVka4VLgkktLZLO18gOR7leGKbzg',
  privateKey: 'POydqe8mRu-VFwZnkhhW82P93YcKkCIuV9OIrD2TQwk'
}
webpush.setVapidDetails(
  'mailto:example@test.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  

    socket.on('message', (data) => {
      messagesData["messages"].push(data)
      const stringData = JSON.stringify(messagesData, null, 2)
      fs.writeFile("messages.json", stringData, (err)=> {
        console.error(err)
      })
      socketIO.emit("messageResponse", data)
    });

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data)
      socketIO.emit("newUserResponse", users)
    })

    
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});



app.get("/messages", (req, res) => {
  res.json(messagesData)
});

app.post("/notify", (req, res) => {
  const pushSubscription = req.body
  console.log("From Node.js >>>>", pushSubscription)
  res.send({message: "Done"})
  const payload = JSON.stringify({title: " Push Test"})
  webpush.sendNotification(pushSubscription, payload)
})
   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
