const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
   firstN: {
      required: true,
      type: String,
   },
   lastN: {
      required: true,
      type: String,
   },
   username: {
      type: String,
      required: true
    },
   password: {
      type: String,
      required: true
    },
   profileImg: {
      required: true,
      type: String,
   },
   aboutMe: {
      required: true,
      type: String,
   },
   aboutBody: String,
   pieces: [
      {
         title: {
            required: true,
            type: String,
         },
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
            required: true,
            type: String,
         },
         drafts: [
            {
               img: {
                  type: String,
               },

            },
         ],
      },
   ],
});

module.exports = mongoose.model('Data', artistSchema);
