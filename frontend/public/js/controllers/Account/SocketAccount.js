socket.on("Get User", ()=>{
    socket.emit("Submit User", Username, Password, Email);
})