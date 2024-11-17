/*
    Controlers:- 
        Controllers means jo API creation men ham arguement men endpoint k bd jo arguement men callback function pass krty hen wo controller kehlaata hy 
*/
const userModel = require("../models/userSchema");

// for has pasword
const bcrypt = require("bcryptjs")

// for creating token for login
const jwt = require("jsonwebtoken");

const authControllers = {
    signup: async(request,response)=>{
        const {name,email,password,mobileNumber} = request.body
        if(!name || !email || !password || !mobileNumber){
            response.status(400).json({
                message:"Required Fields are missing !"
            })
            return
        }
        // hash our password
        const hashPassword = await bcrypt.hash(password,10) // hash(password,round/layer) is a method which is asynchronous so we will use async await
        
        // sending data to db for signing up
        const objectToSend = {
            ...request.body, // is jgaa mera phone number is key men aaegaa (mobileNumber) but is poory object men db pr srf wohi fields jaengi jo mene schema men btai hongi 
            mobile_number:"92 " + mobileNumber,
            password:hashPassword,      // password in hashed form
        }

        // Note:- Before sending the data on DB to signup, first we will check if the same users also exist on db, if this we dont signup this user again, we will show an error message that email already in use, we compare email for checking duplicate user bcz email must be unique for every user
        userModel.findOne({email})
            .then((user)=>{
                if (user){
                    response.status(400).json({
                        message:"Email Address already in use !"
                    })
                }else{
                    userModel.create(objectToSend)
                        .then((user)=>{
                            response.status(200).json({
                                message:"User successfully signup",
                                data:user,
                                status:true
                            })
                        })
                        .catch(()=>{
                            response.status(500).json({
                                message:"Something Went Wrong !",
                            })
                        })
                }
            })
            .catch((err)=>{
                // this catch is for DB throws an error
                response.status(500).json({
                message:`error:- ${err}`
            })
        })
    },

    login: (request,response)=>{ 
        const {email,password} = request.body

        if (!email || !password){
            response.status(400).json({
                message:"Required Fields are missing !"
            })
            return
        }
        userModel.findOne({email})
            .then(async(user)=>{
                if(user){
                    const isPasswordMatched = await bcrypt.compare(password,user.password)
                    // console.log("isPasswordMatched",isPasswordMatched);   // it return true n case of match, else false
                    if (isPasswordMatched){
                        // create token for sending when user has successfully logged in
                        const tokenObj = {
                            ...user
                        }
                        const token = jwt.sign(tokenObj,process.env.JWT_SECRETE_KEY)
                        // console.log("token",token);

                        response.status(200).json({
                            message:"user login successfully !",
                            data:user,
                            status:true,
                            token
                        })
                    }else{
                        response.status(400).json({
                            message:"Credentials not found !"
                        })

                    }

                }else{
                    response.status(400).json({
                            message:"User not found !"
                        })
                }
            })
            .catch((err)=>{
                response.status(500).json({
                    message:`error:- ${err}`
                })
            })
    },
    checking: (request,response)=>{
    response.json({
        message:"Api Hit Successfully !"
    })
    }

}
module.exports = authControllers
