const notesModel = require("../models/notesSchema")

const crudControllers = {
    addNote:(request,response)=>{
    const body = request.body
    // post data on DB
    notesModel.create(body)
        .then((res)=>{
            response.status(200).json({
                message:"note created Successfully!",
                data:res,
                status:true,
            })
        })
        .catch((err)=>{
            response.status(500).json({
                "message":`error:- ${err}`,
            })
        })
    
    },

    getNotes:(request,response)=>{
    notesModel.find({})
        .then((notes)=>{
            response.status(200).json({
                message:"Notes has fetched Successfully !",
                data:notes,
                status:true
            })
        })
        .catch((err)=>{
            response.status(500).json({
                "message":`error:- ${err}`
            })
        })
    },

    updateNote:(request,response)=>{
    // separate id and other fields from request.body
    const {_id,...rest} = request.body
    const id = _id;
    const updatedData = rest
 
    notesModel.findByIdAndUpdate(id,{...updatedData},{new:true})
        .then((res)=>{
            response.status(200).json({
                message:"Note Updated Successfully !",
                data:res,
                status:true
            })
        })
        .catch((err)=>{
            response.status(500).json({
                "message":`error:- ${err}`
            })
        })
    },

    deleteNote:(request,response)=>{
    const {id} = request.params
    notesModel.findByIdAndDelete(id)
        .then((res)=>{
            response.status(200).json({
                message:"note deleted successfully !",
                data:res,
                status:true
            })
        })
        .catch((err)=>{
            response.status(500).json({
                message:`error:- ${err}`,
            })
        })
    },
}
module.exports = crudControllers