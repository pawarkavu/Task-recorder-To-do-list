const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pawarkavu:sXNKOslfvQ6cBMuV@cluster0.39fpu.mongodb.net/task_list_db',{useUnifiedTopology:true,useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db'));
db.once('open', function(){
    console.log('Successfully connected to database');
});

// sXNKOslfvQ6cBMuV
// pawarkavu