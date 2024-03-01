// so this code is bringing
// express package from node_modules
// into server

const express = require("express");
const http = require("http");
// express is a function
const socketIo = require("socket.io");
const SocketIoServer = socketIo.Server;
const expressServer = express();

// it's modifying express server to http server
const httpServer = http.createServer(expressServer);
const io = new SocketIoServer(httpServer);

io.on("connection", (socket) => {
  socket.on("sending message event", (data) => {
    // addEventListener
    io.emit("io spreading message", data); // emit is like click
  });
});
// // server.use is used to pass middleware function
// server.use((req, res, next) => {
//   console.log('this is a middleware');
//   res.send('this is coming from middleware')
// //   next();
// });

expressServer.use(express.static("client"));
function started() {
  console.log("server started on port 8888");
}
// google.com/
// google.com

// get function will ask you route
// for base url you will keep it '/'

// it takes 2 things
// first is route
// second is function to handle that route

// function handleBase(request,response){
//     response.send(`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>
//     <body>
//     <h1>this html code is coming from express app</h1>
//     </body>
//     </html>`);
// }
// function handleSum(request,response){
//     const a = Number(request.query.a);
//     const b = Number(request.query.b);
//     const sum = a+b;
//     response.send(`sum is ${sum}`);
// }

// function handleHTMLbetter(request,response){
//     // response.send is used to send data not file
//     // sendFile
// // '__dirname' -> /Users/prikshit/Accio/February/express server
//     response.sendFile(__dirname+'/index.html');
// }

// server.get('/',handleBase);
// server.get('/better',handleHTMLbetter);
// server.get('/sum',handleSum);

httpServer.listen(8888, started);
