const express=require('express')
const cors=require('cors');
const app=express();
const socket=require('socket.io');
app.use(cors({
    origin:"*"
}))
const server=app.listen(5000,()=>{
    console.log("server runnig in port 5000")
})
const io=socket(server,{
    cors:{
        origin:"*"
    }
})
io.on("connection",(socketclient)=>{
    console.log(socketclient.id)
    // socketclient.on("MESSAGE",(data)=>{
    //     console.log("message :",data)
    //     socketclient.emit("Message",data);
    // })
    socketclient.on("JOINROOM",(data)=>{
        console.log(data.group)
        socketclient.join(data.group)
        io.to(data.group).emit("roomjoined",`${data.name} joined ${data.group}`)

        socketclient.on("sendroomMsg",(clientdata)=>{
            console.log(clientdata.msg);
            io.to(data.group).emit("roomMsg",`${clientdata.name}: ${clientdata.msg}`)
        
        })
    })
})