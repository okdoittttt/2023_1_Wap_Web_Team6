const express = require('express');
const port = process.env.PORT || 8081;
require('dotenv').config();
const cors = require('cors');
const app = express();
const path = require('path');
const members = require("./route/members.tsx")
const board = require("./route/board.tsx")
const cookhelper = require("./route/cookhelper.tsx")
const community = require("./route/community.tsx")
const comments = require("./route/comments.tsx")

app.use(express.static("/front/build")); 
app.use(cors())
app.use('/members', members);
app.use('/board', board);
app.use('/cookhelper', cookhelper);
app.use('/community', community);
app.use('/comments', comments);

// app.use(cors({
//   origin: 'https://localhost:3000',
//   methods: ['GET', 'POST', 'OPTIONS'],
//   credentials: true,
// }));
// 서버 작동하는지 찍는 부분
app.listen(port, () => console.log('Listening on port',port))

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});