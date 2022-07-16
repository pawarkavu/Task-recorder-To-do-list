const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Krishnaksrpal:ONM9YC6DLvKqpf58@cluster0.7r70zwv.mongodb.net/task_list_db',{useUnifiedTopology:true,useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to db'));
db.once('open', function(){
    console.log('Successfully connected to database');
});