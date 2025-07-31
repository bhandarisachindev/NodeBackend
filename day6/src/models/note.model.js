const mongoose=require('mongoose');

const notesSchema = new mongoose.Schema({
  title:String,
  content:String
});

const noteModel = mongoose.model("notes",notesSchema);

module.exports=noteModel;