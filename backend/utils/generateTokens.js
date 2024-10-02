import jwt from "jsonwebtoken";

const generateTokenAndSetCookies= (userId,res)=>
{
    const token=jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d' //check if user is online and reset the timer
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 *60 *60 * 1000,
        httpOnly: true, //XSS attacks (cross-side scripting attack)
        sameSite: "strict", //CSRF attacks (cross-site request forgery attack)
        secure: process.env.NODE_ENV !== "development",
    });
}
export default generateTokenAndSetCookies;
