const express = require('express');
const itemRouter = require('./routers/itemRouter');
// const commentRouter = require('./routers/commentRouter');
// const userRouter = require('./routers/userRouter');

const app = express();

// 1> Middleware
app.use(express.json());

// 2> Routes
app.use('/api/v1/items', itemRouter);
// app.use('/api/v1/comments', commentRouter);
// app.use('/api/v1/users', userRouter);

module.exports = app;
