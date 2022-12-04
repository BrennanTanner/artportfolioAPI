const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
require('dotenv').config();

//new user method
router.post('/newartist', upload.single('image'), async (req, res) => {
   // Upload image to cloudinary
   const result = await cloudinary.uploader.upload(req.file.path);

   // Create new user
   const data = new Model({
      firstN: req.body.firstN,
      lastN: req.body.lastN,
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

//add a new piece method
router.patch('/newpiece/:id', upload.array('image', 5), async (req, res) => {
   try {
      const id = req.params.id;
      const oldPiece = req.body;

      const pieceImages = {
         img: "", 
         drafts: [],
      };

      const newPiece = {...oldPiece, ...pieceImages };

      const newDraft = {
         img: "",
      }

      // Upload image to cloudinary

      for (var i = 0; i < req.files.length; i++) {
         var localFilePath = req.files[i].path;
         const cloudResult = await cloudinary.uploader.upload(localFilePath);
         if(i==0){
            newPiece.img = cloudResult.secure_url; 
            console.log("1 image uploaded");
         }
         else {
            newPiece.drafts.push(newDraft);
            newPiece.drafts[i-1].img = cloudResult.secure_url;
            
            console.log(i+1+" image uploaded");
         }
         
      }
      
      const pieces = await Model.findById(id);

      pieces.pieces.push(newPiece);
      const result = await pieces.save();
      res.send(result);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

//Get all Method
router.get('/getAll', async (req, res) => {
   try {
      const data = await Model.find();
      res.json(data);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

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
router.patch('/update/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(id, updatedData, options);

      res.send(result);
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

      console.log(data.pieces);
      data.pieces = data.pieces.filter(
         (item) => JSON.stringify(item._id) != pieceId
      );

      const result = await data.save();
      res.send(result);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

module.exports = router;
