// import libraries
const mongoose = require('mongoose');
const _ = require('underscore');

// initialize database promise
mongoose.Promise = global.Promise;

// declare model
let DoodleModel = {};

// converts string ID to real MongoDB ID
const convertId = mongoose.Types.ObjectId;

// escape and trim all data strings
const setString = (string) => _.escape(string).trim();

// define model schema
const DoodleSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    set: setString,
  },

  image: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },

  description: {
    type: String,
    trim: true,
    set: setString,
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

// upload new doodle to API
DoodleSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  image: doc.image,
  description: doc.description,
});

// find doodles by user
DoodleSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DoodleModel.find(search).exec(callback);
};

// find all doodles
DoodleSchema.statics.findAll = (callback) =>
DoodleModel.find().select('title image description').exec(callback);

// create model based on schema
DoodleModel = mongoose.model('Doodle', DoodleSchema);

// export model
module.exports.DoodleModel = DoodleModel;
