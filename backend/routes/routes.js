const express = require('express');
const router = express.Router()
const Model = require('../models/model');
router.use(express.json())

//Post Method
router.post('/newartist', async (req, res) => {
   const data = new Model({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      degree: req.body.degree,
      pieces: req.body.pieces,
  })

  try {
   const dataToSave = await data.save();
   res.status(200).json(dataToSave)
}
catch (error) {
   res.status(400).json({message: error.message})
}
})

router.patch('/newpiece/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const newpiece = req.body;
      // const options = { new: true };

      // const result = await Model.findByIdAndUpdate(
      //     { id }, { pieces: { $push: { updatedData }}}, { options } 
      // )

      const pieces = await Model.findById(id)

      pieces.pieces.push(newpiece);
      const result = await pieces.save();

      res.send(result)
  }

  catch (error) {
      res.status(400).json({ message: error.message })
  }
})


//Get all Method
router.get('/getAll', async (req, res) => {
   try{
      const data = await Model.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
   try{
      const data = await Model.findById(req.params.id);
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
   try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

module.exports = router;

