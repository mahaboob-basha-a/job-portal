const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(404).json({message:'User not found'})
        }

        const comparePassword = await bcrypt.compare(password,checkUser?.password);
        if(!comparePassword){
            return res.status(401).json({message:'Invalid User password'})
        }

        const payload = {
                userId: checkUser._id
            }
        const jwtToken = jwt.sign(payload,process.env.JWTSECRETKEY,{expiresIn:60*60*24*7});

        return res.cookie('token',jwtToken,{httpOnly: true,secure: process.env.NODE_ENV === 'production',sameSite:'strict' }).status(200).json({message:'User login success',token: jwtToken})
    
        
    } catch (error) {
       return res.status(500).json({message:'Internal server error'})
    }
}

const userSignUp = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const checkExistUser = await User.findOne({email});
        if(checkExistUser){
           return res.status(400).json({message:'User already exist please login now'})
        }
        
        const hashPassword = await bcrypt.hash(password,10);

        const addUser = new User({name,email,password:hashPassword})
        await addUser.save()
        return res.status(201).json({message:'User registered successfully'})
        

    } catch (error) {
       return res.status(500).json({message:'Internal server error'})
    }
}

const userLogout = (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: process.env.PRODUCTION === 'production' });
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getProfile = async (req,res)=>{
    try {
        const userId = req.user.userId;

        const userInfo = await User.findById(userId).select("name");

        if(!userInfo){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({name:userInfo.name});
        
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { userLogin,userSignUp,getProfile,userLogout }