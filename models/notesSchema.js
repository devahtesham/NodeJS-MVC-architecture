const mongoose = require("mongoose")
const schema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String
    }
})

const notesModel = mongoose.model("notes",schema)

module.exports = notesModel