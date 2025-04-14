import jwt from 'jsonwebtoken';

export const generateToken =(res,user,message)=>{
    const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});//token generate kiya ja raha hai
    //jwt.sign() method is used to sign the token with the secret key and set the expiration time to 1 day

    return res
    .status(200)
    .cookie("token",token,{//yaha cookie set kiya ja raha hai
        httpOnly:true , 
        sameSite:'strict',
        maxAge:24*60*60*1000
    }).json({
        success:true,
        message,
        user
    });
};