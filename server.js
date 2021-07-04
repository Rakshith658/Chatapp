const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const {addUser ,removeUser, getUser} = require("./users") 

// npm run devstart

const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send('server is runing...');
});

io.on('connection',(socket)=>{
    socket.on("join",({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id,name,room})
        // callback({error:"error"})
        if (error) {
            return callback(error)
        }
        socket.emit('message',{user:"admin",text:`${user.name},wlecome to room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:"admin",text:`${user.name},has join`})
        socket.join(user.room)
    })
    socket.on("sendMessage", (message , callback) => {
        const user=getUser(socket.id)
        io.to(user.room).emit('message',{user:user.name, text:message})
        callback()
	});
    socket.on("disconnect", () => {
		console.log("dis connnection");
	});
})

server.listen(PORT,()=>{console.log(`server listening on port ${PORT}`)})