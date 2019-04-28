// import libraries
const mongoose = require('mongoose');

// initialize database promise
mongoose.Promise = global.Promise;

// declare model
let DoodleModel = {};

// convert string ID to real MongoDB ID
const convertId = mongoose.Types.ObjectId;

// define model schema
const DoodleSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

// find doodles by user
DoodleSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DoodleModel.find(search).exec(callback);
};

// find all doodles
DoodleSchema.statics.findAll = (callback) => DoodleModel.find().select('image').exec(callback);

// create model based on schema
DoodleModel = mongoose.model('Doodle', DoodleSchema);

// export model
module.exports.DoodleModel = DoodleModel;
