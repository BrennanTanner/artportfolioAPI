const functions = require('firebase-functions');
const express=require('express');
const cors=require('cors');
const User=require('../config');
const Piece=require('../config');
const server=express();
server.use(express.json());
server.use(cors());

// artist info
server.get('/artist', async (req, res)=>{
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
  res.send(list);
});

server.post('/createartist', async (req, res)=>{
  const data=req.body;
  await User.add(data);
  res.send({msg: 'User Added'});
});

server.post('/updateartist', async (req, res)=>{
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await User.doc(id).update(data);
  res.send({msg: 'User Updated'});
});

server.post('/deleteartist', async (req, res)=>{
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({msg: 'User Deleted'});
});

// pieces in portfolio
server.get('/portfolio', async (req, res)=>{
  const snapshot = await Piece.get();
  const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
  res.send(list);
});

server.post('/createpiece', async (req, res)=>{
  const data=req.body;
  await Piece.add(data);
  res.send({msg: 'Piece Added'});
});

server.post('/updatepiece', async (req, res)=>{
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await Piece.doc(id).update(data);
  res.send({msg: 'Piece Updated'});
});

server.post('/deletepiece', async (req, res)=>{
  const id = req.body.id;
  await User.doc(id).delete();
  res.send({msg: 'Piece Deleted'});
});

exports.app = functions.https.onRequest(server);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });
