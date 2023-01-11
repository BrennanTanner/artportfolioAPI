const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');
const upload = require('../utils/multer');

require('dotenv').config();

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
   try {
      const data = await Model.findById(req.params.id);
      res.json({ isLoggedIn: data.isLoggedIn });
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
            newPiece.cloudinary_id = cloudResult.public_id;
         } else {
            newDraft.img = cloudResult.secure_url;
            newDraft.cloudinary_id = cloudResult.public_id;
            newPiece.drafts.push(newDraft);
         }
      }

      const pieces = await Model.findById(id);

      pieces.pieces.push(newPiece);
      const result = await pieces.save();
      res.send(result);
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
});

//Get all Method
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
      const data = await Model.findById(req.params.id);
      res.json(data);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

//Update by ID Method

router.patch('/update/:id', upload.array('image', 6), async (req, res) => {
   try {
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
            newPiece.cloudinary_id = cloudResult.public_id;
         } else {
            newDraft.img = cloudResult.secure_url;
            newDraft.cloudinary_id = cloudResult.public_id;
            newPiece.drafts.push(newDraft);
         }
      }

      const pieces = await Model.findById(id);

      pieces.pieces.push(newPiece);
      const result = await pieces.save();
      res.send(result);
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message,
      });
   }
});

// router.patch('/update/:id', async (req, res) => {
//    try {
//       const id = req.params.id;
//       const updatedData = req.body;
//       const options = { new: true };

//       const result = await Model.findByIdAndUpdate(id, updatedData, options);

//       res.send(result);
//    } catch (error) {
//       res.status(400).json({ message: error.message });
//    }
// });

router.patch('/updatecovers/:id/:id2', async (req, res) => {
   try {
      const userId = req.params.id;
      const pieceId = req.params.id2;
      let tag = '';
      const user = await Model.findById(userId);
      const piece = await Model.findById(pieceId);

      for (let i = 0; i < user.pieces.length; i++) {
         if (user.pieces[i]._id == pieceId) {
            tag = user.pieces[i].medium;
         }
      }

      for (let i = 0; i < user.pieces.length; i++) {
         if (user.pieces[i]._id != pieceId) {
            user.pieces[i].isCover = false;
         } else if (user.pieces[i].medium != tag) {
         } else {
            user.pieces[i].isCover = true;
         }
      }
      const result = await user.save();

      res.send(result);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

//Delete user by ID Method
// router.delete('/deleteprofile/:id', async (req, res) => {
//    try {
//       const id = req.params.id;
//       const data = await Model.findByIdAndDelete(id);
//       res.send(`${data.name}'s profile has been deleted...`);
//    } catch (error) {
//       res.status(400).json({ message: error.message });
//    }
// });

//Delete piece by ID Method
router.patch('/deletepiece/:id/:id2', async (req, res) => {
   try {
      const userId = req.params.id;
      const pieceIdString = '"' + req.params.id2 + '"';

      const data = await Model.findById(userId);

      for (i = 0; i < data.pieces.length; i++) {
         if (JSON.stringify(data.pieces[i]._id) == pieceIdString) {
            await cloudinary.uploader.destroy(
               data.pieces[i].cloudinary_id,
               function (result) {
                  console.log('main result : ' + result);
               }
            );

            for (x = 0; x < data.pieces[i].drafts.length; x++) {
               console.log(
                  'draft ' +
                     i +
                     ' img id: ' +
                     data.pieces[i].drafts[x].cloudinary_id
               );
               await cloudinary.uploader.destroy(
                  data.pieces[i].drafts[x].cloudinary_id,
                  function (result) {
                     console.log('draft result ' + x + ': ' + result);
                  }
               );
            }
         }
      }

      data.pieces = data.pieces.filter(
         (item) => JSON.stringify(item._id) != pieceIdString
      );

      const result = await data.save();
      res.send(result);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;
