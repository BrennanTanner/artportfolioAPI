const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
   firstName: {
      required: true,
      type: String,
   },
   lastName: {
      required: true,
      type: String,
   },
   degree: {
      required: true,
      type: String,
   },
   aboutBody: String,
   pieces: [{
      title: {
         required: true,
         type: String,
      },
      // mainImg: {
      //    required: true,
      //    type: String,
      // },
      aboutBody: {
         required: true,
         type: String,
      },
      medium: {
         required: true,
         type: String,
      },
      isFavorite: {
         required: true,
         type: String,
      },
      img: {
         data: Buffer,
         contentType: String,
      },
      drafts: [
         {
            img: {
               data: Buffer,
               contentType: String,
            },
            desc: {
               type: String
            },
         },
      ],
   }]
});

module.exports = mongoose.model('Data', artistSchema);
