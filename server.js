const http = require('http');
const app = require('./app');
// const PORT = process.env.PORT;
const PORT = 5000;

let server = http.createServer(app);

server.listen(PORT, (err) => {
    if (err) 
    console.log(err);
    console.log(`server is running on ${PORT}`);
});

// console.log(process.env);