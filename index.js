const express=require('express');
const cors=require('cors');
const User=require('./config');
const Piece=require('./config');
const app=express();
app.use(express.json());
app.use(cors());

//artist info
app.get('/artist', async (req,res)=>{
   const snapshot = await User.get();
   const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
   res.send(list);
});

app.post('/createartist', async(req, res)=>{
   const data=req.body
   await User.add(data);
   res.send({msg:"User Added"});
});

app.post('/updateartist', async(req, res)=>{
   const id = req.body.id;
   delete req.body.id;
   const data = req.body;
   await User.doc(id).update(data);
   res.send({msg:"User Updated"});
});

app.post('/deleteartist', async(req, res)=>{
   const id = req.body.id;
   await User.doc(id).delete();
   res.send({msg:"User Deleted"});
});

//pieces in portfolio
app.get('/portfolio', async (req,res)=>{
   const snapshot = await Piece.get();
   const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
   res.send(list);
});

app.post('/createpiece', async(req, res)=>{
   const data=req.body
   await Piece.add(data);
   res.send({msg:"Piece Added"});
});

app.post('/updatepiece', async(req, res)=>{
   const id = req.body.id;
   delete req.body.id;
   const data = req.body;
   await Piece.doc(id).update(data);
   res.send({msg:"Piece Updated"});
});

app.post('/deletepiece', async(req, res)=>{
   const id = req.body.id;
   await User.doc(id).delete();
   res.send({msg:"Piece Deleted"});
});

//listen on local host
//app.listen(3000, ()=>console.log("up & running 3000"));