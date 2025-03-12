const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { error } = require('console')
const app = express()
const auth = require('./auth')


//real time communication sockets 
const {Server} = require('socket.io')
const http = require('http')
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:['GET','POST'],
    credentials:true
  }
})

//data models
const User = require('./models/user')
const room = require('./models/Chatcreation')
const chat = require('./models/Chatmodel')
const msg = require('./models/Messagemodel')


dotenv.config()

app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:5173' 
    // origin: 'http://localhost:5173' 
}));
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connected to mongoDB"))
.catch(err=>console.log("not connected Database",err))

//socket configuration 
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinRoom', ({ roomID, username }) => {
    socket.join(roomID);
    console.log(`${username} joined room: ${roomID}`);
  });

  socket.on('chatMessage', async ({ roomID, content, sender }) => {
    try {
      if (!roomID || !content || !sender) {
        console.log("Error: roomID, content, and sender are required.");
        return;
      }

      const user = await User.findOne({ username: sender });
      if (!user) {
        console.error('User not found');
        return;
      }

      const newMessage = await msg.create({ sender: user._id, roomID, content });
      const chatroom = await chat.findOne({ roomID });
      if (chatroom) {
        chatroom.messages.push(newMessage);
        await chatroom.save();
      } else {
        await chat.create({ roomID, messages: [newMessage] });
      }

      io.to(roomID).emit('message', {
        sender: { username: user.username },
        content: content,
      });
    } catch (err) {
      console.error('Error creating message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});



app.post('/register', async (req, res) => {
    try {
      const { email, username, password } = req.body;
  
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      let newUser = await User.create({ email, username, password });
  
      let token = jwt.sign({ username: newUser.username, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.cookie("token", token, { httpOnly: true , sameSite: 'None', secure: true});
      return res.status(201).json({ message: "Signup successful!", user: newUser });
    } catch (err) {
      console.error("Signup Error:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      let token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.cookie("token", token, { httpOnly: true ,sameSite: 'None', secure: true });
      return res.json({ message: "Login successful!", token });
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get('/user', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "User not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ username: decoded.username }); 

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
  });
  
  app.post('/createchat', async (req, res) => {
    const { roomID } = req.body; // Extracting roomID from request
    if (!roomID) {
      return res.status(400).json({ message: 'roomID is required' });
    }
    try {
      const roomExist = await chat.findOne({ roomID }); // Using correct field name
      if (roomExist) {
        return res.status(400).json({ message: 'Room already exists' });
      }
      const newChat = await chat.create({ roomID, users: [], messages: [] });
  
      console.log("New room is created and chat created.");
      return res.status(201).json({ message: 'Room created successfully', chat: newChat });
    } catch (err) {
      console.error("Room Creation Error:", err.message);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  });
  
// Join Chat
app.post('/joinchat', async (req, res) => {
    const { roomID, username } = req.body;
    if (!roomID || !username) return res.status(400).json({ message: 'RoomID and username are required' });

    try {
        let existingRoom = await chat.findOne({ roomID });
        if (!existingRoom) return res.status(404).json({ message: "Room does not exist" });

        let user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User does not exist" });
    
        let existingChat = await chat.findOne({ roomID });
        if (!existingChat.users.includes(user._id)) {
            existingChat.users.push(user._id);
            await existingChat.save();
        }

        return res.status(200).json({ message: "Joined room successfully", room: existingRoom });
    } catch (err) {
        console.error("Join Room Error:", err.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/chat/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const chatroom = await chat.findOne({ roomID: roomId })
      .populate({
        path: 'messages',
        populate: { path: 'sender', select: 'username' }
      });

    if (!chatroom) {
      console.log('No chatroom details in room');
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(chatroom.messages);
  } catch (err) {
    console.error("Chat Room Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/rooms', auth,async (req, res) => {
  try{
    const room = await chat.find({users:req.user.id});
    return res.json(room)
  }
  catch(err){
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



server.listen(3000,()=>{
    console.log('port running on 3000')
})