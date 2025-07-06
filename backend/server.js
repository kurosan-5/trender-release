const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// // ファイルアップロード
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ filename: req.file.filename });
// });

// // HTTP & Socket.io
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*" }
// });

// io.on('connection', socket => {
//   console.log("Socket connected");
//   socket.on("msg", data => {
//     io.emit("msg", data);
//   });
// });

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(3001, '0.0.0.0', () => console.log('Backend on port 9000'));
