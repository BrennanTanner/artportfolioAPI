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
      required: true, 
      unique:true
    },
   password: {
      type: String,
      required: true
    },
    isLoggedIn: {
      required: true,
      type: Boolean,
    },
   profileImg: {
      required: true,
      type: String,
   },
   aboutMe: {
      required: true,
      type: String,
   },
   email: {

      type: String,
   },
   phoneNumber: {

      type: String,
   },
   social: [
      {
         socialPlatform: {

            type: String,
         },
         socialUrl: {

            type: String,
         },

      },
   ],
   aboutBody: String,
   pieces: [
      {
         title: {
            required: true,
            type: String,
         },
         aboutBody: {
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
         isCover: {
            required: true,
            type: String,
         },
         img: {
            required: true,
            type: String,
         },
         cloudinary_id: {
            type: String,
         },
         drafts: [
            {
               img: {
                  type: String,
               },
               cloudinary_id: {
                  type: String,
               },
            },
         ],
      },
   ],
});

module.exports = mongoose.model('Data', artistSchema);
