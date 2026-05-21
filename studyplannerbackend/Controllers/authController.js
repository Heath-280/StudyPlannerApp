import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const  Register = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: "All Credentials are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        if (name.length < 3){
            return res.status(400).json({
                message: "Name must be at least 3 characters long"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        };

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Register created successfully"
        })
    }catch(error){
        return res.status(500).json({
            message:"Mongoose error"
        })
    };
}

const Login = async (req,res) => {
    try{
        const {email,password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                message: "All credentials are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }


        const checkuser = await User.findOne({email});

        if(!checkuser) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        };

        const comparedPassword = await bcrypt.compare(password,checkuser.password);

        if(!comparedPassword){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: checkuser._id
        },process.env.JWT_SECRET,{expiresIn: "7d"});

        return res.status(200).json({
            message: "Login Successful",
            token,
            user:{
                id: checkuser._id,
                name: checkuser.name,
                email:checkuser.email
            }
        });
    }catch (error){
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export {Register , Login};