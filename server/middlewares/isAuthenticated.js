import jwt from 'jsonwebtoken';

const isAuthenticated= async (req,res,next) =>{
    try{
        const token=req.cookies.token; // Extract the token from cookies
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Login first to access this resource."
            })
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET); // Verify the token using JWT secret
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid token."
            })
        }
        req.id=decode.userId; // Attach the user ID to the request object
        next(); // Call the next middleware or route handler
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to authenticate user."
        })
    }
}
export default isAuthenticated; // Export the middleware function for use in other files