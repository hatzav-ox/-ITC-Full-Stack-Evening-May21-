"use strict";var express=require("express"),app=express(),port=process.env.PORT||3001;app.use(express.json());var notesRoute=require("./routes/notesRoute");app.use("/notes",notesRoute),app.listen(port,function(){console.log("Listening on port ".concat(port,"..."))});