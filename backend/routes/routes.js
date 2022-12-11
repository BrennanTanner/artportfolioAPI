const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');
const upload = require('../utils/multer');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.jwt;

//new user method
router.post('/newartist', upload.single('image'), async (req, res) => {
   const username = req.body.username;
   const user = await Model.findOne({ username: username });
   if (user) {
      return res.json({
         success: false,
         message: 'Username already taken',
      });
   }

   // Upload image to cloudinary
   const result = await cloudinary.uploader.upload(req.file.path);

   const password = req.body.password;

   const hashedPassword = await bcrypt.hash(password, 12);
   // Create new user
   const data = new Model({
      firstN: req.body.firstN,
      lastN: req.body.lastN,
      username: req.body.username,
      password: hashedPassword,
      isLoggedIn: true,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      aboutMe: req.body.aboutMe,
      pieces: req.body.pieces,
      profileImg: result.secure_url,
   });

   try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

//login
router.patch('/login', upload.single(''), async (req, response) => {
   const username = req.body.username;
   const password = req.body.password;

   const updatedData = { isLoggedIn: true };
   const options = { new: true };
   const user = await Model.findOne({ username: username });

   bcrypt.compare(password, user.password, async function (err, res) {
      if (err) {
         // handle error
      }
      if (res) {
         // Send JWT
         token = jwt.sign({id:user._id,username:user.username,type:'user'},JWT_SECRET,{ expiresIn: '2h'})

         res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
         });
         // maxAge: 2 hours
         res.redirect('/');
         const result = await Model.findByIdAndUpdate(
            user._id,
            updatedData,
            options
         );

         return response.json({
            success: true,
            _id: user._id,
            message: 'passwords match',
         });
      } else {
         // response is OutgoingMessage object that server response http request
         return response.json({
            success: false,
            message: 'passwords do not match',
         });
      }
   });
});

router.get('/status/:id', async (req, res) => {
   const { token } = req.cookies;
   try {
      if (verifyToken(token)) {
         const data = await Model.findById(req.params.id);
         res.send(data.isLoggedIn);
      } else {
         res.send({ message: "'JWT' does not match" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.patch('/logout/:id', async (req, res) => {
   try {
      const updatedData = { isLoggedIn: false };
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(
         req.params.id,
         updatedData,
         options
      );

      res.json({ isLoggedIn: result.isLoggedIn });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//add a new piece method
router.patch('/newpiece/:id', upload.array('image', 6), async (req, res) => {
   try {
      if (verifyToken(token)) {
      const id = req.params.id;
      const oldPiece = req.body;

      const pieceImages = {
         img: '',
         drafts: [],
      };

      const newPiece = { ...oldPiece, ...pieceImages };

      var newDraft = {
         img: '',
      };

      // Upload image to cloudinary

      for (var i = 0; i < req.files.length; i++) {
         var localFilePath = req.files[i].path;
         const cloudResult = await cloudinary.uploader.upload(localFilePath);
         var newDraft = {
            img: '',
         };
         if (i == 0) {
            newPiece.img = cloudResult.secure_url;
         } else {
            newDraft.img = cloudResult.secure_url;
            newPiece.drafts.push(newDraft);
         }
      }

      const pieces = await Model.findById(id);

      pieces.pieces.push(newPiece);
      const result = await pieces.save();
      res.send(result);
   }
   else {
      res.send({ message: "'JWT' does not match" });
   }
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   
   }
});

//Get by id Method
// router.get('/getAll', async (req, res) => {
//    try {
//       const data = await Model.find();
//       res.json(data);
//    } catch (error) {
//       res.status(500).json({ message: error.message });
//    }
// });

//Get by ID Method
router.get('/get/:id', async (req, res) => {
   try {
      if (verifyToken(token)) {
      const data = await Model.findById(req.params.id);
      res.json(data);
   }
   else {
      res.send({ message: "'JWT' does not match" });
   }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
   try {
      if (verifyToken(token)) {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(id, updatedData, options);

      res.send(result);
   }
   else {
      res.send({ message: "'JWT' does not match" });
   }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

//Delete user by ID Method
router.delete('/deleteprofile/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id);
      res.send(`Document with ${data.name} has been deleted..`);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

//Delete piece by ID Method
router.patch('/deletepiece/:id/:id2', async (req, res) => {
   try {
      const userId = req.params.id;
      const pieceId = '"' + req.params.id2 + '"';

      const data = await Model.findById(userId);

      data.pieces = data.pieces.filter(
         (item) => JSON.stringify(item._id) != pieceId
      );

      const result = await data.save();
      res.send(result);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

const verifyToken = (token) => {
   try {
      const verify = jwt.verify(token, JWT_SECRET);
      if (verify.type === 'user') {
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.log(JSON.stringify(error), 'error');
      return false;
   }
};

module.exports = router;
