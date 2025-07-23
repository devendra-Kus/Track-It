import jwt from "jsonwebtoken";


const jwtAuthMiddle = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token) 
        return res.status(401).json({message : "unathorized user"});

    try{
        const detail = jwt.verify(token , process.env.JWT_SECRET);
        req.key = detail;
        next();
    }
    catch(err){
        return res.status(500).json({error: err});
    }
}

const genrateToken = (user)=>{
   return jwt.sign(user,process.env.JWT_SECRET);
}

export { jwtAuthMiddle ,genrateToken}; 