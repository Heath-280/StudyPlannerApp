import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                message:"unauthorized"
            })
        };

        const jwtToken = token.split(" ")[1];
        const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

export default authMiddleware;