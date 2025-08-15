const express = require('express');

const app=express();

app.use(express.json());  //middleware

let notes = [];

app.post("/notes",(req,res)=>{   //to add new notes in json format  {title:"",content:""}
  notes.push(req.body);
  
res.json({message:"Note created succesully."});
});

app.patch("/notes/:index",(req,res)=>{ // to edit a note
  const index=req.params.index;
  const {title,content}=req.body;
  
  notes[index].title=title;
  notes[index].content=content;
  res.json({message:"Updated Sucessfully."});
});


app.delete("/notes/:index",(req,res)=>{ //to delete a note
 const index=req.params.index;
 delete notes[index];

 res.json({message: "Note deleted succesfully."});
});

app.get("/",(req,res)=>{ // to view all notes
  res.json(notes);
});


app.listen(3000,()=>{
  console.log("server is running on port 3000.");
});

