const mongoose = require('mongoose');

const promptSchema = mongoose.Schema({
  // mongoose creates an id on its own
  title: { type: String, default: 'Open Journal' },
  content: { type: String, default: 'Unguided session, no prompt needed.' }
});

/* schema is just a blueprint - in order to actually create objects from that definition
we turn it into a model by using this function to use it in our code and export it */
module.exports = mongoose.model('Prompt', promptSchema);
