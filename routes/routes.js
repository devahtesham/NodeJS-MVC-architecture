const express = require("express")
const middlewares = require("../middlewares")
const authControllers = require("../controller/authControllers");
const crudControllers = require("../controller/crudControllers")
const router = express.Router()


// for testing purpose
router.get("/sample",(request,response)=>{
    console.log("API Hit");
    response.send("Api Hit !!")
})

// ====================== AUTHENTICATION APIS ===========================
// signup api 
router.post("/signup",authControllers.signup)

// login api
router.post("/login",authControllers.login)

// ================= MIDDLEWARE ======================

// to understand the working of middlewares
// app.use("/",(request,response,next)=>{
//     const user = false;
//     if (user){
//         next()
//     }else{
//         response.json({
//             message:"Invalid User"
//         })
//     }
// })


// this is our private API because in this API we are performing authentication
// router.get("/checking",middlewares.authMiddleware,authControllers.checking)

// ========== private APIs =============
/*
    Note:- yaad rahy k jb bhi ham koi Private API call krrahy hen frontend se tu kiun k wo API private hy tu laazmi us request men headers k andr token rkh kr bhyjyngn user authrize hy ya nhi check krne k lye
*/
// send data
router.post("/note",middlewares.authMiddleware,crudControllers.addNote)

// get data
router.get("/notes",middlewares.authMiddleware,crudControllers.getNotes)

// update data
router.put("/note",middlewares.authMiddleware,crudControllers.updateNote)

// delete data
router.delete("/note/:id",middlewares.authMiddleware,crudControllers.deleteNote)

module.exports = router